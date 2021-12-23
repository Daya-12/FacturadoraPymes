package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperProducto;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelPersonalizado;

public class MapperProducto implements IMapperProducto{

	@Override
	public ProductoModelPersonalizado mostrarProductos(Producto producto) {
		Empresa empresaEntity = producto.getEmpresa();
		Categoria categoriaEntity = producto.getCategoria();
		
		ProductoModelPersonalizado productoM = new ProductoModelPersonalizado();
		productoM.setId(producto.getIdProducto());
		productoM.setNombre(producto.getNombreProducto());
		productoM.setValor(producto.getValorProducto());
		productoM.setId_categoria(categoriaEntity.getIdCategoria());
		productoM.setCategoria(categoriaEntity.getNombreCategoria());
		productoM.setId_empresa(empresaEntity.getIdEmpresa());
		productoM.setNombre_empresa(empresaEntity.getRazonSocial());
		productoM.setActivo(producto.getActivo());
		return productoM;
	}

	@Override
	public ProductoModelConsultaP mostrarProductosPersonalizado(Producto producto, String cantidad) {
		Empresa empresaEntity = producto.getEmpresa();
		Categoria categoriaEntity = producto.getCategoria();
		
		ProductoModelConsultaP productoMC = new ProductoModelConsultaP();
		productoMC.setId(producto.getIdProducto());
		productoMC.setNombre(producto.getNombreProducto());
		productoMC.setValor(producto.getValorProducto());
		productoMC.setCategoria(categoriaEntity.getNombreCategoria());
		productoMC.setId_empresa(empresaEntity.getIdEmpresa());
		productoMC.setNombre_empresa(empresaEntity.getRazonSocial());
		productoMC.setActivo(producto.getActivo());
		productoMC.setValorFacturado(Double.parseDouble(cantidad));
		return productoMC;
	}

	
}
