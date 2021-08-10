package com.ProcesoPagos.ProcesoPagos.Model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ReciboModel {
	private FacturaModel factura;
	private ClienteModel cliente;
	private Date fecha;
	private String hora;
	private String refpago;
	
	
}
