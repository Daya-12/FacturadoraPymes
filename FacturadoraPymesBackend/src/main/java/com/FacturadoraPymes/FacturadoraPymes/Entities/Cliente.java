package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;

import java.util.List;

@Entity
@NamedQuery(name="Cliente.findAll", query="SELECT c FROM Cliente c")
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_cliente")
	private int idCliente;

	@Column(name="activo")
	private boolean activoCli;

	@Column(name="apellidos_cli")
	private String apellidosCli;

	@Column(name="codpostal_cli")
	private String codpostalCli;

	@Column(name="direccion_cli")
	private String direccionCli;

	@Column(name="email_cli")
	private String emailCli;

	@Column(name="nombres_cli")
	private String nombresCli;

	@Column(name="num_documento")
	private String numDocumento;

	@Column(name="telefono_cli")
	private String telefonoCli;

	//bi-directional many-to-one association to Ciudad
	@ManyToOne
	@JoinColumn(name="id_ciudad")
	private Ciudad ciudad;

	//bi-directional many-to-one association to Documento
	@ManyToOne
	@JoinColumn(name="id_tdocumento")
	private Documento documento;
	
	//bi-directional many-to-one association to Empresa
	@ManyToOne
	@JoinColumn(name="id_empresa")
	private Empresa empresa;
	
	
	@OneToMany(mappedBy="cliente")
	private List<Factura> facturas;

	public Cliente() {
	}

	public int getIdCliente() {
		return this.idCliente;
	}

	public void setIdCliente(int idCliente) {
		this.idCliente = idCliente;
	}

	public boolean getActivo() {
		return this.activoCli;
	}

	public void setActivo(boolean activoCli) {
		this.activoCli = activoCli;
	}

	public String getApellidosCli() {
		return this.apellidosCli;
	}

	public void setApellidosCli(String apellidosCli) {
		this.apellidosCli = apellidosCli;
	}

	public String getCodpostalCli() {
		return this.codpostalCli;
	}

	public void setCodpostalCli(String codpostalCli) {
		this.codpostalCli = codpostalCli;
	}

	public String getDireccionCli() {
		return this.direccionCli;
	}

	public void setDireccionCli(String direccionCli) {
		this.direccionCli = direccionCli;
	}

	public String getEmailCli() {
		return this.emailCli;
	}

	public void setEmailCli(String emailCli) {
		this.emailCli = emailCli;
	}

	public String getNombresCli() {
		return this.nombresCli;
	}

	public void setNombresCli(String nombresCli) {
		this.nombresCli = nombresCli;
	}

	public String getNumDocumento() {
		return this.numDocumento;
	}

	public void setNumDocumento(String numDocumento) {
		this.numDocumento = numDocumento;
	}

	public String getTelefonoCli() {
		return this.telefonoCli;
	}

	public void setTelefonoCli(String telefonoCli) {
		this.telefonoCli = telefonoCli;
	}

	public Ciudad getCiudad() {
		return this.ciudad;
	}

	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}

	public Documento getDocumento() {
		return this.documento;
	}

	public void setDocumento(Documento documento) {
		this.documento = documento;
	}
	
	public Empresa getEmpresa() {
		return this.empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
	
	public List<Factura> getFacturas() {
		return this.facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public Factura addFactura(Factura factura) {
		getFacturas().add(factura);
		factura.setCliente(this);
		return factura;
	}

	public Factura removeFactura(Factura factura) {
		getFacturas().remove(factura);
		factura.setCliente(null);
		return factura;
	}

}