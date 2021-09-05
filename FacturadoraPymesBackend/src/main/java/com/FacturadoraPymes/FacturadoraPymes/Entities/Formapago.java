package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@NamedQuery(name="Formapago.findAll", query="SELECT f FROM Formapago f")
public class Formapago implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_formaPago")
	private int idformaPago;

	@Column(name="nombre_formaPago")
	private String nombreformaPago;
	
	@Column(name="activo")
	private boolean activoformaPago;
	
	@OneToMany(mappedBy="formaPago")
	private List<Factura> facturas;
	
	public Formapago() {
	}

	public int getIdformaPago() {
		return this.idformaPago;
	}

	public void setIdformaPago(int idformaPago) {
		this.idformaPago = idformaPago;
	}

	public String getNombreformaPago() {
		return this.nombreformaPago;
	}

	public void setNombreformaPago(String nombreformaPago) {
		this.nombreformaPago = nombreformaPago;
	}
	
	public boolean getActivoformaPago() {
		return this.activoformaPago;
	}

	public void setActivoformaPago(boolean activoformaPago) {
		this.activoformaPago = activoformaPago;
	}
	
	public List<Factura> getFacturas() {
		return this.facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public Factura addFactura(Factura factura) {
		getFacturas().add(factura);
		factura.setFormaPago(this);

		return factura;
	}

	public Factura removeFactura(Factura factura) {
		getFacturas().remove(factura);
		factura.setFormaPago(null);

		return factura;
	}
}