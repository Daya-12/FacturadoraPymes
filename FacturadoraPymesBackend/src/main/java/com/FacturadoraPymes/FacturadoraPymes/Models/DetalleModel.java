package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DetalleModel {
	private FacturaModel factura;
	private ProductoModel producto;
	private int cantidad;
	private double valorUnitario;
	private double valorTotal;
}
