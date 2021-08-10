package com.ProcesoPagos.ProcesoPagos.Model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class FacturaModel {
	private int id;
	private EstadoModel estado;
	private Date fechaemision;
	private Date fechavencimiento;
	private double subtotal;
	private TipoimpuestoModel impuesto;
	private double total;
	
}
