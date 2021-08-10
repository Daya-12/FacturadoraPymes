package com.ProcesoPagos.ProcesoPagos.Mapper;

import com.ProcesoPagos.ProcesoPagos.Entity.Categoriaprod;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Model.CategoriaprodModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;

public class MapperProducto implements IMapperProducto {

	@Override
	public ProductoModel mostrarProductos(Producto productos) {
		ProductoModel producto = new ProductoModel();
		// Llave foranea de categoria
		CategoriaprodModel categoria = new CategoriaprodModel();
		Categoriaprod categoriaprod = productos.getCategoriaprod();
		categoria.setId(categoriaprod.getIdCategoria());
		categoria.setNombre(categoriaprod.getNombreCategoria());
		//
		producto.setId(productos.getIdProducto());
		producto.setNombre(productos.getNombreProducto());
		producto.setValor(productos.getValorProducto());
		producto.setCategoria(categoria);
		return producto;
	}

	@Override
	public ProductoModel mostrarProdsClients(Producto productos, String cantidad) {
		ProductoModel producto = new ProductoModel();
		// Llave foranea de categoria
		CategoriaprodModel categoria = new CategoriaprodModel();
		Categoriaprod categoriaprod = productos.getCategoriaprod();
		categoria.setId(categoriaprod.getIdCategoria());
		categoria.setNombre(categoriaprod.getNombreCategoria());
		//
		producto.setId(productos.getIdProducto());
		producto.setNombre(productos.getNombreProducto());
		producto.setValor(productos.getValorProducto());
		producto.setCategoria(categoria);
		producto.setCantclientes(cantidad);
		return producto;
	}

	@Override
	public Producto recibirProductos(ProductoModel productosModel) {
		Producto producto = new Producto();
		Categoriaprod categoriaprod = new Categoriaprod();
		CategoriaprodModel categoria = new CategoriaprodModel();
		
		categoriaprod.setIdCategoria(categoria.getId());
		categoriaprod.setNombreCategoria(categoria.getNombre());

		producto.setIdProducto(productosModel.getId());
		producto.setNombreProducto(productosModel.getNombre());
		producto.setValorProducto(productosModel.getValor());
		producto.setCategoriaprod(categoriaprod);
		return producto;
	}

}
