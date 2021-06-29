package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;

@Entity
@NamedQuery(name="Impuesto.findAll", query="SELECT i FROM Impuesto i")
public class Impuesto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_impuesto")
	private int idImpuesto;

	@Column(name="nombre_impuesto")
	private String nombreImpuesto;

	@Column(name="porc_impuesto")
	private double porcImpuesto;
	
	@Column(name="activo")
	private boolean activoImpuesto;

	//bi-directional many-to-many association to Factura
	@ManyToMany
	@JoinTable(
		name="impuestofactura"
		, joinColumns={
			@JoinColumn(name="id_impuesto")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_factura")
			}
		)
	private List<Factura> facturas;

	public Impuesto() {
	}

	public int getIdImpuesto() {
		return this.idImpuesto;
	}

	public void setIdImpuesto(int idImpuesto) {
		this.idImpuesto = idImpuesto;
	}

	public String getNombreImpuesto() {
		return this.nombreImpuesto;
	}

	public void setNombreImpuesto(String nombreImpuesto) {
		this.nombreImpuesto = nombreImpuesto;
	}

	public double getPorcImpuesto() {
		return this.porcImpuesto;
	}

	public void setPorcImpuesto(double porcImpuesto) {
		this.porcImpuesto = porcImpuesto;
	}

	public boolean getActivoImpuesto() {
		return this.activoImpuesto;
	}

	public void setActivoImpuesto(boolean activoImpuesto) {
		this.activoImpuesto = activoImpuesto;
	}
	
	public List<Factura> getFacturas() {
		return this.facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

}