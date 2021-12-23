package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperProducto;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IProductoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelPersonalizado;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICategoriaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IProductoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Actualizaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class ProductoServiceImpl implements IProductoService{
	
	private final IProductoRepository productoRepository;
	private final IFacturaRepository facturaRepository;
	private final ICategoriaRepository categoriaRepository;
	private final IMapperProducto mapperProducto;
	private final Validaciones validaciones;
	
	@Autowired
	public ProductoServiceImpl(IProductoRepository productoRepository, IMapperProducto mapperProducto,
			Validaciones validaciones,ICategoriaRepository categoriaRepository,IFacturaRepository facturaRepository) {
		this.productoRepository = productoRepository;
		this.categoriaRepository= categoriaRepository;
		this.mapperProducto = mapperProducto;
		this.validaciones = validaciones;
		this.facturaRepository= facturaRepository;
	}
	
	@Override
	public MensajeModel crear(ProductoModel producto) {
		MensajeModel mensajeModel = new MensajeModel();
		Producto productoEntity = new Producto();
		boolean validarIdProducto = validaciones.validarIdProducto(productoRepository, producto.getId());
		Empresa empresa=new Empresa();
		empresa.setIdEmpresa(producto.getEmpresa().getId());
		
		Categoria categoria=new Categoria();
		categoria.setIdCategoria(producto.getCategoria().getId());
		
		if (!validarIdProducto) {
			productoEntity.setIdProducto(producto.getId());
			productoEntity.setNombreProducto(producto.getNombre());
			productoEntity.setValorProducto(producto.getValor());
			productoEntity.setEmpresa(empresa);
			productoEntity.setCategoria(categoria);
			productoEntity.setActivo(true);
			productoRepository.save(productoEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El producto no se pudo registrar");
	}

	@Override
	public MensajeModel actualizar(ProductoModel producto) {
		boolean validarIdProducto = validaciones.validarIdProducto(productoRepository, producto.getId());
		Optional<Categoria> categoria = validaciones.validarCategoria(categoriaRepository,producto.getCategoria().getId());
		if (validarIdProducto && !categoria.isEmpty()) {
			Actualizaciones actualizacion = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Producto> productoConsult = productoRepository.findById(producto.getId());
			Producto productoEntity = productoConsult.get();
			actualizacion.validarActualizacionProducto(productoEntity,categoria.get(), producto);
			productoRepository.save(productoEntity);
			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		}
		return null;
	}

	@Override
	public boolean validarNombre(String nombre,int idEmpresa) {
		boolean validarCorreo = validaciones.validarNombreProducto(productoRepository, nombre,idEmpresa);
		return validarCorreo;
	}

	@Override
	public List<ProductoModelPersonalizado> mostrarProductos(int idEmpresa) {
		List<ProductoModelPersonalizado> productos = new LinkedList<>();
		List<Producto> productoEntities = productoRepository.consultarProductos(idEmpresa,true);
		productos = StreamSupport.stream(productoEntities.spliterator(), false).map((producto) -> {
			return mapperProducto.mostrarProductos(producto);
		}).collect(Collectors.toList());
		return productos;
	}

	@Override
	public boolean validarNombreDistinto(String nombre, int idProducto, int idEmpresa) {
		boolean validarNombreDistinto = validaciones.validarNombreDistinto(productoRepository, nombre,idProducto,idEmpresa);
		return validarNombreDistinto;
	}

	@Override
	public int eliminar(int idProducto) {
		int retorno=0;
		List<Detalle> facturas = productoRepository.detallesProducto(idProducto);
		boolean validarIdProducto = validaciones.validarIdProducto(productoRepository, idProducto);
		if(facturas.isEmpty() && validarIdProducto) {
			productoRepository.deleteById(idProducto);
			retorno = 1;
		}else if(!facturas.isEmpty() && validarIdProducto) {
			Optional<Producto> productoConsult = productoRepository.findById(idProducto);
			Producto productoEntity = productoConsult.get();
			productoEntity.setActivo(false);
			productoRepository.save(productoEntity);
			retorno = 2;
		}
		
		return retorno;
	}

	@Override
	public List<ProductoModelConsultaP> mostrarProductosPersonalizado(int idEmpresa) {
		List<ProductoModelConsultaP> productos = new LinkedList<>();
		Iterable<Producto> productoEntities = productoRepository.consultarProductos(idEmpresa,true);;
		String cantidad;
		for (Producto producto : productoEntities) {
			cantidad = facturaRepository.consultarProductosTotal(producto.getIdProducto());
			if (cantidad == null) {
				cantidad = "0";
			}
			productos.add(mapperProducto.mostrarProductosPersonalizado(producto, cantidad));
		}
		return productos;
	}

}
