package com.FacturadoraPymes.FacturadoraPymes.Models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaConsultaTablaModel {
	private int id;
	private String referencia;
	private Date fechaEmision;
	private Date fechaVencimiento;
	private String ciudad;
	private String cliente;
	private double total;
	private String usuario;
	private String estado;

}
