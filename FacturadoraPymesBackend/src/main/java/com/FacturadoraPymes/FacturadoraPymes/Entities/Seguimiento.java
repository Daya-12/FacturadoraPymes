package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the seguimiento database table.
 * 
 */
@Entity
@NamedQuery(name="Seguimiento.findAll", query="SELECT s FROM Seguimiento s")
public class Seguimiento implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_seguimiento")
	private int idSeguimiento;

	@ManyToOne
	@JoinColumn(name="id_factura")
	private Factura factura;
	
	@Temporal(TemporalType.DATE)
	@Column(name="fecha")
	private Date fecha;
	
	@Column(name="valor")
	private double valor;
	
	@Column(name="saldo_pteF")
	private double saldoPteF;



	public Seguimiento() {
	}

	public int getIdSeguimiento() {
		return this.idSeguimiento;
	}

	public void setIdSeguimiento(int idSeguimiento) {
		this.idSeguimiento = idSeguimiento;
	}
	
	public Factura getFactura() {
		return this.factura;
	}

	public void setFactura(Factura factura) {
		this.factura = factura;
	}

	public Date getFecha() {
		return this.fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public double getValor() {
		return this.valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}
	
	public double getSaldoPteF() {
		return this.saldoPteF;
	}

	public void setSaldoPteF(double saldoPteF) {
		this.saldoPteF = saldoPteF;
	}
	
}