package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the ciudad database table.
 * 
 */
@Entity
@NamedQuery(name="Ciudad.findAll", query="SELECT c FROM Ciudad c")
public class Ciudad implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_ciudad")
	private int idCiudad;

	@Column(name="nombre_ciudad")
	private String nombreCiudad;
	
	@Column(name="activo")
	private boolean activoCiudad;

	//bi-directional many-to-one association to Cliente
	@OneToMany(mappedBy="ciudad")
	private List<Cliente> clientes;

	//bi-directional many-to-one association to Empresa
	@OneToMany(mappedBy="ciudad")
	private List<Empresa> empresas;
	
	@OneToMany(mappedBy="ciudad")
	private List<Factura> facturas;

	public Ciudad() {
	}

	public int getIdCiudad() {
		return this.idCiudad;
	}

	public void setIdCiudad(int idCiudad) {
		this.idCiudad = idCiudad;
	}

	public String getNombreCiudad() {
		return this.nombreCiudad;
	}

	public void setNombreCiudad(String nombreCiudad) {
		this.nombreCiudad = nombreCiudad;
	}

	public boolean getActivoCiudad() {
		return this.activoCiudad;
	}

	public void setActivoCiudad(boolean activoCiudad) {
		this.activoCiudad = activoCiudad;
	}

	public List<Cliente> getClientes() {
		return this.clientes;
	}

	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	public Cliente addCliente(Cliente cliente) {
		getClientes().add(cliente);
		cliente.setCiudad(this);

		return cliente;
	}

	public Cliente removeCliente(Cliente cliente) {
		getClientes().remove(cliente);
		cliente.setCiudad(null);

		return cliente;
	}

	public List<Empresa> getEmpresas() {
		return this.empresas;
	}

	public void setEmpresas(List<Empresa> empresas) {
		this.empresas = empresas;
	}

	public Empresa addEmpresa(Empresa empresa) {
		getEmpresas().add(empresa);
		empresa.setCiudad(this);

		return empresa;
	}

	public Empresa removeEmpresa(Empresa empresa) {
		getEmpresas().remove(empresa);
		empresa.setCiudad(null);

		return empresa;
	}
	
	public List<Factura> getFacturas() {
		return this.facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public Factura addFactura(Factura factura) {
		getFacturas().add(factura);
		factura.setCiudad(this);
		return factura;
	}

	public Factura removeFactura(Factura factura) {
		getFacturas().add(factura);
		factura.setCiudad(this);
		return factura;
	}

}