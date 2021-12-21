package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperProducto;
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

	
}
