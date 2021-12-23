package com.FacturadoraPymes.FacturadoraPymes.IServices;

import java.util.List;

import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelPersonalizado;

public interface IProductoService {
	MensajeModel crear(ProductoModel producto);
	MensajeModel actualizar(ProductoModel producto);
	boolean validarNombre(String nombre,int idEmpresa);
	List<ProductoModelPersonalizado> mostrarProductos(int idEmpresa);
	boolean validarNombreDistinto(String nombre,int idProducto,int idEmpresa);
	int eliminar(int idProducto);
	List<ProductoModelConsultaP> mostrarProductosPersonalizado(int idEmpresa);

}
