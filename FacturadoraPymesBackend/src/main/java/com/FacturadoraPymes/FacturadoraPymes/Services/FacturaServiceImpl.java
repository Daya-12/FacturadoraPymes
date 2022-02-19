package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Estado;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Formapago;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Impuesto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFacturaService;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperDetalle;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperImpuesto;
import com.FacturadoraPymes.FacturadoraPymes.Models.DetallesRecibirModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaRegistroModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ImpuestoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IDetalleRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEstadoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IImpuestoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IProductoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class FacturaServiceImpl implements IFacturaService{

	private final IFacturaRepository facturaRepository;
	private final IMapperFactura mapperFactura;
	private final IEmpresaRepository empresaRepository;
	private final IImpuestoRepository impuestoRepository;
	private final IProductoRepository productoRepository;
	private final IDetalleRepository detalleRepository;
	private final IEstadoRepository estadoRepository;
	private final Validaciones validaciones;
	
	@Autowired
	public FacturaServiceImpl(IEstadoRepository estadoRepository,IFacturaRepository facturaRepository,IProductoRepository productoRepository, IDetalleRepository detalleRepository,IMapperFactura mapperFactura,IEmpresaRepository empresaRepository,IImpuestoRepository impuestoRepository,Validaciones validaciones) {
		this.facturaRepository = facturaRepository;
		this.mapperFactura = mapperFactura;
		this.empresaRepository=empresaRepository;
		this.impuestoRepository= impuestoRepository;
		this.validaciones = validaciones;
		this.detalleRepository = detalleRepository;
		this.productoRepository = productoRepository;
		this.estadoRepository = estadoRepository;
	}
	
	@Override
	public String obtenerReferencia(int idEmpresa) {
		int numeroAleatorio=(int)(Math.random()*99999)+1000; 
		Optional<Empresa> empresa = empresaRepository.findById(idEmpresa);
		String referenciaFactura=empresa.get().getAbreviacion()+"-"+numeroAleatorio;
		boolean validacion=validaciones.validarReferenciaFactura(facturaRepository, referenciaFactura);
		
		while (validacion) {
			numeroAleatorio=(int)(Math.random()*99999)+1000; 
			referenciaFactura=empresa.get().getAbreviacion()+"-"+numeroAleatorio;
			validacion=validaciones.validarReferenciaFactura(facturaRepository, referenciaFactura);
		}

		return referenciaFactura;
	}

	@Override
	public MensajeModel registrar(FacturaRegistroModel factura) {
		boolean validacion=validaciones.validarReferenciaFactura(facturaRepository, factura.getRefPago());
		if(!validacion) {
		MensajeModel mensajeModel = new MensajeModel();
		Factura facturaEntity = new Factura();
		Ciudad ciudadEntity = new Ciudad();
		ciudadEntity.setIdCiudad(factura.getCiudad().getId());
		ciudadEntity.setNombreCiudad(factura.getCiudad().getNombre());
		
		Cliente clienteEntity = new Cliente();
		clienteEntity.setIdCliente(factura.getCliente().getId());
		clienteEntity.setNombreCli(factura.getCliente().getNombre());
		
		Usuario usuarioEntity = new Usuario();
		usuarioEntity.setIdUsuario(factura.getUsuario().getId());
		
		Estado estadoEntity = new Estado();
		estadoEntity.setIdEstado(estadoRepository.consultarId(factura.getEstado().getNombre(), true));
		estadoEntity.setNombreEstado(factura.getEstado().getNombre());
		
		Formapago formaPagoEntity = new Formapago();
		if(factura.getFormaPago().getId()>0) {
		formaPagoEntity.setIdformapago(factura.getFormaPago().getId());
		formaPagoEntity.setNombreformapago(factura.getFormaPago().getNombre());}
		else formaPagoEntity=null;
		
		facturaEntity.setIdFactura(factura.getId());
		facturaEntity.setCiudad(ciudadEntity);
		facturaEntity.setCliente(clienteEntity);
		facturaEntity.setUsuario(usuarioEntity);
		facturaEntity.setEstado(estadoEntity);
		facturaEntity.setFormaPago(formaPagoEntity);
		facturaEntity.setFormaPagoPersonalizada(factura.getFormaPagoPersonalizada());
		facturaEntity.setFechaEmision(factura.getFechaEmision());
		facturaEntity.setFechaVencimiento(factura.getFechaVencimiento());
		facturaEntity.setSubtotalFactura(factura.getSubTotal());
		facturaEntity.setTotalFact(factura.getTotal());
		facturaEntity.setValorLetras(factura.getValorLetras());
		facturaEntity.setRefPago(factura.getRefPago());
		
		if(!factura.getImpuestos().isEmpty()) {
			MapperImpuesto mapperImpuestos = new MapperImpuesto();
			List<Impuesto> impuestos = new LinkedList<>();
			for (ImpuestoModel impuestoModel : factura.getImpuestos()) {
				impuestos.add(mapperImpuestos.recibirImpuestos(impuestoModel));
			}	
			facturaEntity.setImpuestos(impuestos);
		}
		
		MapperDetalle mapperDetalles = new MapperDetalle();
		List<Detalle> detalles = new LinkedList<>();
		for (DetallesRecibirModel detalleModel : factura.getDetalles()) {
			detalles.add(mapperDetalles.recibirDetalles(detalleModel));
		}	
		facturaEntity.setDetalles(detalles);
		
		Factura facturaGuardada=facturaRepository.save(facturaEntity);
		
		
		if(!factura.getImpuestos().isEmpty()) {
		List<Factura> facturasImpuestos = new LinkedList<>();
		Impuesto impuestoEntity = new Impuesto();
		for (int i = 0; i < factura.getImpuestos().size(); i++) {
			int idImpuesto = factura.getImpuestos().get(i).getId();
			Optional<Impuesto> impuestosEntities = impuestoRepository.findById(idImpuesto);
			impuestoEntity = impuestosEntities.get();
			facturasImpuestos = impuestoEntity.getFacturas();
			facturasImpuestos.add(facturaEntity);
			impuestoEntity.setFacturas(facturasImpuestos);
		}
		impuestoRepository.save(impuestoEntity);
		}
		
		List<Detalle> detallesProductos = new LinkedList<>();
		Producto productoEntity = new Producto();
		Detalle detalleEntity = new Detalle();
		for (int i = 0; i < factura.getDetalles().size(); i++) {
			int idProducto = factura.getDetalles().get(i).getIdProducto();
			Optional<Producto> productosEntities = productoRepository.findById(idProducto);
			productoEntity = productosEntities.get();
			detalleRepository.insertarDetalles(facturaGuardada.getIdFactura(),productoEntity.getIdProducto(),detalles.get(i).getCantidad(),detalles.get(i).getValorUnitario(),detalles.get(i).getValorTotal());
		}
		mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
		return mensajeModel;
		}
		
		return null;
	}

}
