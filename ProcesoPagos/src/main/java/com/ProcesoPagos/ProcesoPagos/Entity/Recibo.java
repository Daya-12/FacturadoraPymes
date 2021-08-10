package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Time;
import java.util.Date;


/**
 * The persistent class for the recibo database table.
 * 
 */
@Entity
@NamedQuery(name="Recibo.findAll", query="SELECT r FROM Recibo r")
public class Recibo implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ReciboPK id;

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_pago")
	private Date fechaPago;

	@Column(name="hora_pago")
	private Time horaPago;

	@Column(name="ref_pago")
	private String refPago;

	//bi-directional many-to-one association to Cliente
	@ManyToOne
	@JoinColumn(name="id_cliente",insertable=false,updatable=false)
	private Cliente cliente;

	//bi-directional many-to-one association to Factura
	@ManyToOne
	@JoinColumn(name="id_factura",insertable=false,updatable=false)
	private Factura factura;

	public Recibo() {
	}

	public ReciboPK getId() {
		return this.id;
	}

	public void setId(ReciboPK id) {
		this.id = id;
	}

	public Date getFechaPago() {
		return this.fechaPago;
	}

	public void setFechaPago(Date fechaPago) {
		this.fechaPago = fechaPago;
	}

	public Time getHoraPago() {
		return this.horaPago;
	}

	public void setHoraPago(Time horaPago) {
		this.horaPago = horaPago;
	}

	public String getRefPago() {
		return this.refPago;
	}

	public void setRefPago(String refPago) {
		this.refPago = refPago;
	}

	public Cliente getCliente() {
		return this.cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Factura getFactura() {
		return this.factura;
	}

	public void setFactura(Factura factura) {
		this.factura = factura;
	}

}