package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the tipoimpuesto database table.
 * 
 */
@Entity
@NamedQuery(name="Tipoimpuesto.findAll", query="SELECT t FROM Tipoimpuesto t")
public class Tipoimpuesto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_impuesto")
	private int idImpuesto;

	@Column(name="nombre_impuesto")
	private String nombreImpuesto;

	@Column(name="porc_impuesto")
	private double porcImpuesto;

	//bi-directional many-to-one association to Factura
	@OneToMany(mappedBy="tipoimpuesto")
	private List<Factura> facturas;

	public Tipoimpuesto() {
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

	public List<Factura> getFacturas() {
		return this.facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public Factura addFactura(Factura factura) {
		getFacturas().add(factura);
		factura.setTipoimpuesto(this);

		return factura;
	}

	public Factura removeFactura(Factura factura) {
		getFacturas().remove(factura);
		factura.setTipoimpuesto(null);

		return factura;
	}

}