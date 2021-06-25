package com.FacturadoraPymes.FacturadoraPymes.Models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class FacturaModel {
	private int id;
	private CiudadModel ciudad;
	private ClienteModel cliente;
	private UsuarioModel usuario;
	private EstadoModel estado;
	private FormaPagoModel formaPago;
	private String formaPagoPersonalizada;
	private Date fechaEmision;
	private Date fechaVencimiento;
	private double subTotal;
	private double total;
	private String valorLetras;
	private String refPago;
}
