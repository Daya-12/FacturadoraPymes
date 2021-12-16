package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperProducto;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IProductoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICategoriaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IProductoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Actualizaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class ProductoServiceImpl implements IProductoService{
	
	private final IProductoRepository productoRepository;
	private final ICategoriaRepository categoriaRepository;
	private final IMapperProducto mapperProducto;
	private final Validaciones validaciones;
	
	@Autowired
	public ProductoServiceImpl(IProductoRepository productoRepository, IMapperProducto mapperProducto,
			Validaciones validaciones,ICategoriaRepository categoriaRepository) {
		this.productoRepository = productoRepository;
		this.categoriaRepository= categoriaRepository;
		this.mapperProducto = mapperProducto;
		this.validaciones = validaciones;
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

}
