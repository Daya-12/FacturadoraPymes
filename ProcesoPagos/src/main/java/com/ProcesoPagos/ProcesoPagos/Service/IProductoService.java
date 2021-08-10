package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.List;

import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;

public interface IProductoService {
	MensajeModel crearProducto(ProductoModel producto);
	List<ProductoModel> mostrarProductos();
	List<ProductoModel> mostrarProdsClients();
	MensajeModel eliminarProducto(Integer idProd);
	MensajeModel actualizarProd(ProductoModel producto);
}
