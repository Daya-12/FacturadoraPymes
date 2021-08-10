package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the usuario database table.
 * 
 */
@Entity
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_usuario")
	private int idUsuario;

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

	public Usuario() {
	}

	public int getIdUsuario() {
		return this.idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
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

}