package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoModelPersonalizado {
	private int id;
	private String nombre;
	private double valor;
	private int id_categoria;
	private String categoria;
	private int id_empresa;
	private String nombre_empresa;
	private boolean activo;

}
