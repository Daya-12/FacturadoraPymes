package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the factura database table.
 * 
 */
@Entity
@NamedQuery(name="Factura.findAll", query="SELECT f FROM Factura f")
public class Factura implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_factura")
	private int idFactura;

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_emision")
	private Date fechaEmision;

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_vencimiento")
	private Date fechaVencimiento;

	@Column(name="subtotal_factura")
	private double subtotalFactura;

	@Column(name="total_fact")
	private double totalFact;

	@Column(name="valor_factura")
	private double valorFactura;

	//bi-directional many-to-one association to Detalle
	@OneToMany(mappedBy="factura")
	private List<Detalle> detalles;

	//bi-directional many-to-one association to Estado
	@ManyToOne
	@JoinColumn(name="id_estado")
	private Estado estado;

	//bi-directional many-to-one association to Tipoimpuesto
	@ManyToOne
	@JoinColumn(name="id_impuesto")
	private Tipoimpuesto tipoimpuesto;

	//bi-directional many-to-one association to Recibo
	@OneToMany(mappedBy="factura")
	private List<Recibo> recibos;

	public Factura() {
	}

	public int getIdFactura() {
		return this.idFactura;
	}

	public void setIdFactura(int idFactura) {
		this.idFactura = idFactura;
	}

	public Date getFechaEmision() {
		return this.fechaEmision;
	}

	public void setFechaEmision(Date fechaEmision) {
		this.fechaEmision = fechaEmision;
	}

	public Date getFechaVencimiento() {
		return this.fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public double getSubtotalFactura() {
		return this.subtotalFactura;
	}

	public void setSubtotalFactura(double subtotalFactura) {
		this.subtotalFactura = subtotalFactura;
	}

	public double getTotalFact() {
		return this.totalFact;
	}

	public void setTotalFact(double totalFact) {
		this.totalFact = totalFact;
	}

	public double getValorFactura() {
		return this.valorFactura;
	}

	public void setValorFactura(double valorFactura) {
		this.valorFactura = valorFactura;
	}

	public List<Detalle> getDetalles() {
		return this.detalles;
	}

	public void setDetalles(List<Detalle> detalles) {
		this.detalles = detalles;
	}

	public Detalle addDetalle(Detalle detalle) {
		getDetalles().add(detalle);
		detalle.setFactura(this);

		return detalle;
	}

	public Detalle removeDetalle(Detalle detalle) {
		getDetalles().remove(detalle);
		detalle.setFactura(null);

		return detalle;
	}

	public Estado getEstado() {
		return this.estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public Tipoimpuesto getTipoimpuesto() {
		return this.tipoimpuesto;
	}

	public void setTipoimpuesto(Tipoimpuesto tipoimpuesto) {
		this.tipoimpuesto = tipoimpuesto;
	}

	public List<Recibo> getRecibos() {
		return this.recibos;
	}

	public void setRecibos(List<Recibo> recibos) {
		this.recibos = recibos;
	}

	public Recibo addRecibo(Recibo recibo) {
		getRecibos().add(recibo);
		recibo.setFactura(this);

		return recibo;
	}

	public Recibo removeRecibo(Recibo recibo) {
		getRecibos().remove(recibo);
		recibo.setFactura(null);

		return recibo;
	}

}