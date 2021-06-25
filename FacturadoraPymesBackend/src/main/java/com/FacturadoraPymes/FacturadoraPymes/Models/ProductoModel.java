package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProductoModel {
	private int id;
	private String nombre;
	private double valor;
	private CategoriaModel categoria;
	private EmpresaModel empresa;
	private boolean activo;
}
