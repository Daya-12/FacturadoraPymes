package com.ProcesoPagos.ProcesoPagos.Model;

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
	private CategoriaprodModel categoria;
	private String cantclientes;
}
