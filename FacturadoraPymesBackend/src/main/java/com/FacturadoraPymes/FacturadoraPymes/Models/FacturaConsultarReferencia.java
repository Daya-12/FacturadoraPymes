package com.FacturadoraPymes.FacturadoraPymes.Models;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaConsultarReferencia {
	private int id;
	private String referencia;
	private String ciudad;
	private ClienteModelPersonalizado cliente;
	private String usuario;
	private String formaPago;
	private String formaPagoPersonalizada;
	private Date fechaEmision;
	private Date fechaVencimiento;
	private double subtotal;
	private double impuestoIva;
	private double total;
	private String valorLetras;
	private List<DetallesRecibirModel> detalles;

}
