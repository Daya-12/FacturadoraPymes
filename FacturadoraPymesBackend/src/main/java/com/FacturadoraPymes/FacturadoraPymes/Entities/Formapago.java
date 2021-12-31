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
	@Column(name="id_formapago")
	private int idformapago;

	@Column(name="nombre_formapago")
	private String nombreformapago;
	
	@Column(name="activo")
	private boolean activoformapago;
	
	@OneToMany(mappedBy="formapago")
	private List<Factura> facturas;
	
	public Formapago() {
	}

	public int getIdformapago() {
		return this.idformapago;
	}

	public void setIdformapago(int idformapago) {
		this.idformapago = idformapago;
	}

	public String getNombreformapago() {
		return this.nombreformapago;
	}

	public void setNombreformapago(String nombreformapago) {
		this.nombreformapago = nombreformapago;
	}
	
	public boolean getActivoformapago() {
		return this.activoformapago;
	}

	public void setActivoformaPago(boolean activoformaPago) {
		this.activoformapago = activoformaPago;
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