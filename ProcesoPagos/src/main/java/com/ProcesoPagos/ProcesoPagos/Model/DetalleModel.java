package com.ProcesoPagos.ProcesoPagos.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DetalleModel {
	private int id;
	private FacturaModel factura;
	private int cantidad;
	private ProductoModel producto;
	private double valorunitario;
	private double valortotal;
		
}
