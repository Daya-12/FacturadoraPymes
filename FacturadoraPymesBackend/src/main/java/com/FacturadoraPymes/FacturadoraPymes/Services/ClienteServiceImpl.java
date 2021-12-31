package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Documento;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCliente;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IClienteService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICiudadRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IClienteRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Actualizaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class ClienteServiceImpl implements IClienteService{
	private final IClienteRepository clienteRepository;
	private final ICiudadRepository ciudadRepository;
	private final IFacturaRepository facturaRepository;
	private final IMapperCliente mapperCliente;
	private final Validaciones validaciones;
	
	@Autowired
	public ClienteServiceImpl(IClienteRepository clienteRepository,IFacturaRepository facturaRepository,ICiudadRepository ciudadRepository,IMapperCliente mapperCliente,
			Validaciones validaciones) {
		this.clienteRepository = clienteRepository;
		this.ciudadRepository = ciudadRepository;
		this.facturaRepository = facturaRepository;
		this.mapperCliente = mapperCliente;
		this.validaciones = validaciones;
	}
	
	@Override
	public MensajeModel crear(ClienteModel cliente) {
		MensajeModel mensajeModel = new MensajeModel();
		Cliente clienteEntity = new Cliente();
		boolean validarIdentificacion = validaciones.validarIdentificacionCliente(clienteRepository, cliente.getNumDocumento(), cliente.getDocumento().getId(), cliente.getEmpresa().getId());
		
		if (!validarIdentificacion) {
			Empresa empresa=new Empresa();
			empresa.setIdEmpresa(cliente.getEmpresa().getId());
			
			Documento documento=new Documento();
			documento.setIdTdocumento(cliente.getDocumento().getId());
			
			Ciudad ciudad=new Ciudad();
			ciudad.setIdCiudad(cliente.getCiudad().getId());
			
			clienteEntity.setIdCliente(cliente.getId());
			clienteEntity.setEmpresa(empresa);
			clienteEntity.setNombreCli(cliente.getNombre());
			clienteEntity.setDocumento(documento);
			clienteEntity.setNumDocumento(cliente.getNumDocumento());
			clienteEntity.setDireccionCli(cliente.getDireccion());
			clienteEntity.setCodpostalCli(cliente.getCodPostal());
			clienteEntity.setCiudad(ciudad);
			clienteEntity.setTelefonoCli(cliente.getTelefono());
			clienteEntity.setActivo(true);
			clienteRepository.save(clienteEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El usuario no se pudo registrar");
	}
	
	@Override
	public MensajeModel actualizar(ClienteModel cliente) {
		boolean validarIdCliente = validaciones.validarExistenciaCliente(clienteRepository, cliente.getId());
		if (validarIdCliente) {
			Optional<Ciudad> ciudad = ciudadRepository.findById(cliente.getCiudad().getId());
			Actualizaciones actualizacionCliente = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Cliente> clienteConsult = clienteRepository.findById(cliente.getId());
			Cliente clienteEntity = clienteConsult.get();
			actualizacionCliente.validarActualizacionCliente(clienteEntity, cliente,ciudad.get());
			clienteRepository.save(clienteEntity);
			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		}
		return null;
	}
	
	@Override
	public boolean validarIdentificacion(String numIdentificacion, int idTipo, int idEmpresa) {
		return validaciones.validarIdentificacionCliente(clienteRepository, numIdentificacion, idTipo, idEmpresa);
	}

	@Override
	public boolean validarNombre(String nombre, int idEmpresa) {
		return validaciones.validarNombreCliente(clienteRepository, nombre, idEmpresa);
	}

	@Override
	public List<ClienteModelPersonalizado> mostrarClientes(int idEmpresa) {
		List<ClienteModelPersonalizado> clientes = new LinkedList<>();
		List<Cliente> clienteEntities = clienteRepository.consultarClientes(idEmpresa,true);
		clientes = StreamSupport.stream(clienteEntities.spliterator(), false).map((cliente) -> {
			return mapperCliente.mostrarClientes(cliente);
		}).collect(Collectors.toList());
		return clientes;
	}
	
	@Override
	public int eliminar(int idCliente) {
		int retorno=0;
		List<Factura> facturas = clienteRepository.facturasCreadasCliente(idCliente);
		boolean validarIdCliente = validaciones.validarExistenciaCliente(clienteRepository, idCliente);
		if(facturas.isEmpty() && validarIdCliente) {
			clienteRepository.deleteById(idCliente);
			retorno = 1;
		}else if(!facturas.isEmpty() && validarIdCliente) {
			Optional<Cliente> clienteConsult = clienteRepository.findById(idCliente);
			Cliente clienteEntity = clienteConsult.get();
			clienteEntity.setActivo(false);
			clienteRepository.save(clienteEntity);
			retorno= 2;
		}
		return retorno;

	}

	@Override
	public List<ClienteModelConsultaP> mostrarClientesPersonalizado(int idEmpresa) {
		List<ClienteModelConsultaP> clientes = new LinkedList<>();
		Iterable<Cliente> clienteEntities = clienteRepository.consultarClientes(idEmpresa,true);;
		String cantidad;
		for (Cliente cliente : clienteEntities) {
			cantidad = facturaRepository.consultarTotalFacturado(cliente.getIdCliente());
			if (cantidad == null) {
				cantidad = "0";
			}
			clientes.add(mapperCliente.mostrarClientesPersonalizado(cliente, cantidad));
		}
		return clientes;
	}

}
