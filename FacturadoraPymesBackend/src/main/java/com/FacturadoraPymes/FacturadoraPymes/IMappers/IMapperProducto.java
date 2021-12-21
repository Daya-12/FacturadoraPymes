package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelPersonalizado;

public interface IMapperProducto {

	public ProductoModelPersonalizado mostrarProductos (Producto producto);
}
