package com.FacturadoraPymes.FacturadoraPymes.Models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallesRecibirModel {
	private int idProducto;
	private String nombreProducto;
	private int cantidad;
	private double valorUnitario;
	private double valorTotal;

}
