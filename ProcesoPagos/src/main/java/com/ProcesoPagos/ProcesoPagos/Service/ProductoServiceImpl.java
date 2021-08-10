package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProcesoPagos.ProcesoPagos.Entity.Categoriaprod;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperProducto;
import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;
import com.ProcesoPagos.ProcesoPagos.Repository.ICategoriaProdRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IProductoRepository;
import com.ProcesoPagos.ProcesoPagos.Util.Actualizaciones;
import com.ProcesoPagos.ProcesoPagos.Util.Constantes;
import com.ProcesoPagos.ProcesoPagos.Util.Validaciones;

@Service
public class ProductoServiceImpl implements IProductoService {

	private final IProductoRepository productoRepository;
	private final ICategoriaProdRepository categoriaRepository;
	private final IMapperProducto mapperProducto;
	private final Validaciones validaciones;

	@Autowired
	public ProductoServiceImpl(IProductoRepository productoRepository, ICategoriaProdRepository categoriaRepository,
			IMapperProducto mapperProducto, Validaciones validaciones) {
		this.productoRepository = productoRepository;
		this.categoriaRepository = categoriaRepository;
		this.mapperProducto = mapperProducto;
		this.validaciones = validaciones;
	}

	@Override
	public MensajeModel crearProducto(ProductoModel producto) {
		MensajeModel mensajeModel = new MensajeModel();
		Producto productoEntity = new Producto();
		boolean validarIdProducto = validaciones.validarIdProducto(productoRepository, producto);
		Optional<Categoriaprod> categoriaProd = validaciones.validarCategoria(producto, categoriaRepository);
		if (validarIdProducto && !categoriaProd.isEmpty()) {
			productoEntity.setIdProducto(producto.getId());
			productoEntity.setNombreProducto(producto.getNombre());
			productoEntity.setValorProducto(producto.getValor());
			productoEntity.setCategoriaprod(categoriaProd.get());
			productoRepository.save(productoEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El producto no se pudo registrar");

	}

	@Override
	public List<ProductoModel> mostrarProductos() {
		List<ProductoModel> productos = new LinkedList<>();
		Iterable<Producto> productoEntities = productoRepository.findAll();
		productos = StreamSupport.stream(productoEntities.spliterator(), false).map((producto) -> {
			return mapperProducto.mostrarProductos(producto);
		}).collect(Collectors.toList());
		return productos;
	}

	@Override
	public List<ProductoModel> mostrarProdsClients() {
		List<ProductoModel> productos = new LinkedList<>();
		Iterable<Producto> productoEntities = productoRepository.findAll();
		String cantidad;
		for (Producto producto : productoEntities) {
			cantidad = productoRepository.consultarCantidad(producto.getIdProducto());
			if (cantidad == null) {
				cantidad = "0";
			}
			productos.add(mapperProducto.mostrarProdsClients(producto, cantidad));
		}
		return productos;
	}

	@Override
	public MensajeModel eliminarProducto(Integer idProd) {
		MensajeModel mensajeModel = new MensajeModel();
		boolean validarIdProducto = validaciones.validarExistenciaProd(productoRepository, idProd);
		boolean validarRelaciones = validaciones.validarRelaciones(productoRepository, idProd);
		if (validarIdProducto && validarRelaciones) {
			productoRepository.deleteById(idProd);
			mensajeModel.setMensaje(Constantes.ELIMINAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El producto no se pudo eliminar");
	}

	@Override
	public MensajeModel actualizarProd(ProductoModel producto) {

		boolean validarIdProducto = validaciones.validarExistenciaProd(productoRepository, producto.getId());
		boolean validarDescripcion = validaciones.validarDescripcion(productoRepository, producto);
		Optional<Categoriaprod> categoriaProd = validaciones.validarCategoria(producto, categoriaRepository);

		if (validarIdProducto && validarDescripcion && !categoriaProd.isEmpty()) {
			Actualizaciones actualizacionProd = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Producto> productoConsult = productoRepository.findById(producto.getId());
			Producto productoEntity = productoConsult.get();
			actualizacionProd.validarActualizacionProducto(productoEntity, producto, categoriaProd);
			productoRepository.save(productoEntity);
			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		} else
			throw new NoSuchElementException("No fue posible actualizar el producto");
	}

}
