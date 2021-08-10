package com.ProcesoPagos.ProcesoPagos.Mapper;

import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;

public interface IMapperProducto {
	
	public ProductoModel mostrarProductos (Producto productos);
	public ProductoModel mostrarProdsClients (Producto productos,String cantidad);
	public Producto recibirProductos(ProductoModel productosModel);
	
}
