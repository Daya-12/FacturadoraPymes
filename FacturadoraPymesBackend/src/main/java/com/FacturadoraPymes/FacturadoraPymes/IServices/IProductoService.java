package com.FacturadoraPymes.FacturadoraPymes.IServices;

import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;

public interface IProductoService {
	MensajeModel crear(ProductoModel producto);
	MensajeModel actualizar(ProductoModel producto);
	boolean validarNombre(String nombre,int idEmpresa);

}
