package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the documento database table.
 * 
 */
@Entity
@NamedQuery(name="Documento.findAll", query="SELECT d FROM Documento d")
public class Documento implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_tdocumento")
	private int idTdocumento;

	@Column(name="nombre_tdocumento")
	private String nombreTdocumento;

	//bi-directional many-to-one association to Cliente
	@OneToMany(mappedBy="documento")
	private List<Cliente> clientes;

	public Documento() {
	}

	public int getIdTdocumento() {
		return this.idTdocumento;
	}

	public void setIdTdocumento(int idTdocumento) {
		this.idTdocumento = idTdocumento;
	}

	public String getNombreTdocumento() {
		return this.nombreTdocumento;
	}

	public void setNombreTdocumento(String nombreTdocumento) {
		this.nombreTdocumento = nombreTdocumento;
	}

	public List<Cliente> getClientes() {
		return this.clientes;
	}

	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	public Cliente addCliente(Cliente cliente) {
		getClientes().add(cliente);
		cliente.setDocumento(this);

		return cliente;
	}

	public Cliente removeCliente(Cliente cliente) {
		getClientes().remove(cliente);
		cliente.setDocumento(null);

		return cliente;
	}

}