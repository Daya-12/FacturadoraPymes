package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ProcesoPagos.ProcesoPagos.Entity.Ciudad;
import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Entity.Documento;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperCliente;
import com.ProcesoPagos.ProcesoPagos.Mapper.MapperProducto;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;
import com.ProcesoPagos.ProcesoPagos.Repository.ICiudadRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IClienteRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IDocumentoRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IProductoRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IReciboRepository;
import com.ProcesoPagos.ProcesoPagos.Util.Actualizaciones;
import com.ProcesoPagos.ProcesoPagos.Util.Constantes;
import com.ProcesoPagos.ProcesoPagos.Util.Validaciones;

@Service
public class ClienteServiceImpl implements IClienteService {

	private final IClienteRepository clienteRepository;
	private final IDocumentoRepository documentoRepository;
	private final ICiudadRepository ciudadRepository;
	private final IMapperCliente mapperCliente;
	private final Validaciones validaciones;
	private final IReciboRepository reciboRepository;

	private final IProductoRepository productoRepository;

	@Autowired
	public ClienteServiceImpl(IClienteRepository clienteRepository, IDocumentoRepository documentoRepository,
			ICiudadRepository ciudadRepository, IMapperCliente mapperCliente, Validaciones validaciones,
			IReciboRepository reciboRepository, IProductoRepository productoRepository) {
		this.clienteRepository = clienteRepository;
		this.documentoRepository = documentoRepository;
		this.ciudadRepository = ciudadRepository;
		this.mapperCliente = mapperCliente;
		this.validaciones = validaciones;
		this.reciboRepository = reciboRepository;
		this.productoRepository = productoRepository;
	}

	@Override
	public MensajeModel crearCliente(ClienteModel cliente) {
		Cliente clienteEntity = new Cliente();
		MensajeModel mensajeModel = new MensajeModel();
		boolean validarIdCliente = validaciones.validarIdCliente(clienteRepository, cliente);
		boolean validarNumDoc = validaciones.validarNumDoc(clienteRepository, cliente);
		boolean validarCorreo = validaciones.validarCorreoC(clienteRepository, cliente);
		Optional<Documento> documento = validaciones.validarDocumento(cliente, documentoRepository);
		Optional<Ciudad> ciudad = validaciones.validarCiudad(cliente, ciudadRepository);
		if (validarIdCliente && validarNumDoc && validarCorreo && !documento.isEmpty() && !ciudad.isEmpty()) {
			clienteEntity.setIdCliente(cliente.getId());
			clienteEntity.setDocumento(documento.get());
			clienteEntity.setNumDocumento(cliente.getNumeroDocumento());
			clienteEntity.setNombresCli(cliente.getNombres());
			clienteEntity.setApellidosCli(cliente.getApellidos());
			clienteEntity.setDireccionCli(cliente.getDireccion());
			clienteEntity.setCiudad(ciudad.get());
			clienteEntity.setCodpostalCli(cliente.getCodpostal());
			clienteEntity.setTelefonoCli(cliente.getTelefono());
			clienteEntity.setEmailCli(cliente.getEmail());

			// *Enlazar productos a cliente , relacion many to many!!
			MapperProducto mapperProducto = new MapperProducto();
			List<Producto> productos = new LinkedList<>();
			for (ProductoModel productoModel : cliente.getProductos()) {
				productos.add(mapperProducto.recibirProductos(productoModel));
			}
			clienteEntity.setProductos(productos);
			clienteRepository.save(clienteEntity);

			// *Enlazar cliente a productos
			List<Cliente> clienteProds = new LinkedList<>();
			Producto productoEntity = new Producto();
			for (int i = 0; i < cliente.getProductos().size(); i++) {
				int idProducto = cliente.getProductos().get(i).getId();
				Optional<Producto> productosEntities = productoRepository.findById(idProducto);
				productoEntity = productosEntities.get();
				clienteProds = productoEntity.getClientes();
				clienteProds.add(clienteEntity);
				productoEntity.setClientes(clienteProds);
			}
			productoRepository.save(productoEntity);

			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El cliente no se pudo registrar");
	}

	@Override
	public MensajeModel validarCliente(ClienteModel cliente) {
		MensajeModel mensajeModel = new MensajeModel();
		boolean validarIdCliente = validaciones.validarIdCliente(clienteRepository,cliente);
		boolean validarNumDoc = validaciones.validarNumDoc(clienteRepository, cliente);
		boolean validarCorreo = validaciones.validarCorreoC(clienteRepository, cliente);
		if (validarIdCliente && validarNumDoc && validarCorreo) {
			mensajeModel.setMensaje(Constantes.USUARIO_INEXISTENTE);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El cliente ya está registrado");
	}

	@Override
	public List<ClienteModel> mostrarClientes() {
		List<ClienteModel> clientes = new LinkedList<>();
		Iterable<Cliente> clienteEntities = clienteRepository.findAll();
		clientes = StreamSupport.stream(clienteEntities.spliterator(), false).map((cliente) -> {
			return mapperCliente.mostrarClientes(cliente);
		}).collect(Collectors.toList());
		return clientes;
	}

	@Override
	public List<ClienteModel> mostrarClientesSaldoF() {
		List<ClienteModel> clientes = new LinkedList<>();
		Iterable<Cliente> clienteEntities = clienteRepository.findAll();
		String valor;
		for (Cliente cliente : clienteEntities) {
			valor = reciboRepository.consultarValor(cliente.getIdCliente());
			if (valor == null) {
				valor = "0";
			}
			clientes.add(mapperCliente.mostrarClientesSaldoF(cliente, valor));
		}
		return clientes;
	}

	@Override
	public MensajeModel actualizarCliente(ClienteModel cliente) {
		boolean validarCorreo = validaciones.validarExistenciaCorreoCliente(clienteRepository, cliente);
		Optional<Documento> documento = validaciones.validarDocumento(cliente, documentoRepository);
		Optional<Ciudad> ciudad = validaciones.validarCiudad(cliente, ciudadRepository);
		boolean validarIdCliente = validaciones.validarExistenciaCliente(clienteRepository, cliente.getId());
		
		if (validarIdCliente && validarCorreo && !documento.isEmpty() && !ciudad.isEmpty()) {
			Actualizaciones actualizacionCliente = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Cliente> clienteConsult = clienteRepository.findById(cliente.getId());
			Cliente clienteEntity = clienteConsult.get();

			actualizacionCliente.validarActualizacionCliente(clienteEntity, cliente, ciudad, productoRepository);
			clienteRepository.save(clienteEntity);

			List<Cliente> clienteProds = new LinkedList<>();
			Producto productoEntity = new Producto();
			for (int i = 0; i < cliente.getProductos().size(); i++) {
				int idProducto = cliente.getProductos().get(i).getId();
				Optional<Producto> productosEntities = productoRepository.findById(idProducto);
				productoEntity = productosEntities.get();
				clienteProds = productoEntity.getClientes();
				clienteProds.add(clienteEntity);
				productoEntity.setClientes(clienteProds);
			}
			productoRepository.save(productoEntity);

			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		} else
			throw new NoSuchElementException("No fue posible actualizar el cliente");
	}

	@Override
	public String eliminarCliente(Integer idCliente) {
		String valor = "";
		boolean validarIdCliente = validaciones.validarExistenciaCliente(clienteRepository, idCliente);
		valor = reciboRepository.consultarValor(idCliente);
		if (validarIdCliente && valor==null) {
			Optional<Cliente> clienteConsult = clienteRepository.findById(idCliente);
			Cliente clienteEntity = clienteConsult.get();
			for (int i = 0; i < clienteEntity.getProductos().size(); i++) {
				productoRepository.eliminarProducto(idCliente, clienteEntity.getProductos().get(i).getIdProducto());
			}
			clienteRepository.deleteById(idCliente);
			return valor;
		} else {
			return valor;
		}
	}

}
