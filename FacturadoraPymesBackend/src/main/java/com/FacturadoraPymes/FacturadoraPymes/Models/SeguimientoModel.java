package com.FacturadoraPymes.FacturadoraPymes.Models;

import java.util.Date;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class SeguimientoModel {
	private int id;
	private Factura factura;
	private Date fecha;
	private double valor;
	private double saldoPteF;
}
