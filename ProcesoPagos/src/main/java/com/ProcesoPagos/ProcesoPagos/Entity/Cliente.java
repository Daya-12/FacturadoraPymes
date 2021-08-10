package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the cliente database table.
 * 
 */
@Entity
@NamedQuery(name="Cliente.findAll", query="SELECT c FROM Cliente c")
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_cliente")
	private int idCliente;

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

	//bi-directional many-to-many association to Producto
	@ManyToMany(mappedBy="clientes")
	private List<Producto> productos;

	//bi-directional many-to-one association to Recibo
	@OneToMany(mappedBy="cliente")
	private List<Recibo> recibos;

	public Cliente() {
	}

	public int getIdCliente() {
		return this.idCliente;
	}

	public void setIdCliente(int idCliente) {
		this.idCliente = idCliente;
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

	public List<Producto> getProductos() {
		return this.productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public List<Recibo> getRecibos() {
		return this.recibos;
	}

	public void setRecibos(List<Recibo> recibos) {
		this.recibos = recibos;
	}

	public Recibo addRecibo(Recibo recibo) {
		getRecibos().add(recibo);
		recibo.setCliente(this);

		return recibo;
	}
	
	public Recibo removeRecibo(Recibo recibo) {
		getRecibos().remove(recibo);
		recibo.setCliente(null);

		return recibo;
	}

}