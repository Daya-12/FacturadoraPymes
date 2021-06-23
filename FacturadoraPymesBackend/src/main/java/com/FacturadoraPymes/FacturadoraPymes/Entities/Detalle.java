package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the detalle database table.
 * 
 */
@Entity
@NamedQuery(name="Detalle.findAll", query="SELECT d FROM Detalle d")
public class Detalle implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private DetallePK id;

	@Column(name="cantidad")
	private int CantidadP;

	@Column(name="valor_total")
	private double valorTotal;

	@Column(name="valor_unitario")
	private double valorUnitario;

	//bi-directional many-to-one association to Factura
	@ManyToOne
	@JoinColumn(name="id_factura",insertable=false,updatable=false)
	private Factura factura;

	//bi-directional many-to-one association to Producto
	@ManyToOne
	@JoinColumn(name="id_producto",insertable=false,updatable=false)
	private Producto producto;

	public Detalle() {
	}

	public DetallePK getId() {
		return this.id;
	}

	public void setId(DetallePK id) {
		this.id = id;
	}

	public int getCantidad() {
		return this.CantidadP;
	}

	public void setCantidad(int cantidad) {
		this.CantidadP = cantidad;
	}


	public double getValorTotal() {
		return this.valorTotal;
	}

	public void setValorTotal(double valorTotal) {
		this.valorTotal = valorTotal;
	}

	public double getValorUnitario() {
		return this.valorUnitario;
	}

	public void setValorUnitario(double valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

	public Factura getFactura() {
		return this.factura;
	}

	public void setFactura(Factura factura) {
		this.factura = factura;
	}

	public Producto getProducto() {
		return this.producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

}