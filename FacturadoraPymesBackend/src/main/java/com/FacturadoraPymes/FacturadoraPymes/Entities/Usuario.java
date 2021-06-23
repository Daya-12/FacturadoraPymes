package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;


@Entity
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_usuario")
	private int idUsuario;

	@Column(name="activo")
	private boolean activoUser;

	@Column(name="correo_user")
	private String correoUser;

	@Column(name="nivel_user")
	private int nivelUser;

	@Column(name="nombre_user")
	private String nombreUser;

	@Column(name="pass_user")
	private String passUser;

	@Column(name="telefono_user")
	private String telefonoUser;

	//bi-directional many-to-one association to Empresa
	@ManyToOne
	@JoinColumn(name="id_empresa")
	private Empresa empresa;
	
	@OneToMany(mappedBy="usuario")
	private List<Factura> facturas;
	

	public Usuario() {
	}

	public int getIdUsuario() {
		return this.idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	public boolean getActivo() {
		return this.activoUser;
	}

	public void setActivo(boolean activo) {
		this.activoUser = activo;
	}

	public String getCorreoUser() {
		return this.correoUser;
	}

	public void setCorreoUser(String correoUser) {
		this.correoUser = correoUser;
	}

	public int getNivelUser() {
		return this.nivelUser;
	}

	public void setNivelUser(int nivelUser) {
		this.nivelUser = nivelUser;
	}

	public String getNombreUser() {
		return this.nombreUser;
	}

	public void setNombreUser(String nombreUser) {
		this.nombreUser = nombreUser;
	}

	public String getPassUser() {
		return this.passUser;
	}

	public void setPassUser(String passUser) {
		this.passUser = passUser;
	}

	public String getTelefonoUser() {
		return this.telefonoUser;
	}

	public void setTelefonoUser(String telefonoUser) {
		this.telefonoUser = telefonoUser;
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
		factura.setUsuario(this);
		return factura;
	}

	public Factura removeFactura(Factura factura) {
		getFacturas().remove(factura);
		factura.setUsuario(null);
		return factura;
	}
}