package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoModelConsultaP {
	private int id;
	private String nombre;
	private double valor;
	private String categoria;
	private int id_empresa;
	private String nombre_empresa;
	private boolean activo;
	private double valorFacturado;

}
