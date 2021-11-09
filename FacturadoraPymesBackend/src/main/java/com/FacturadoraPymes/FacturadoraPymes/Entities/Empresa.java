package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the empresa database table.
 * 
 */
@Entity
@NamedQuery(name="Empresa.findAll", query="SELECT e FROM Empresa e")
public class Empresa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_empresa")
	private int idEmpresa;

	@Column(name="activo")
	private boolean activoE;

	@Column(name="correo_electronico")
	private String correoElectronico;
	
	@Column(name="direccion")
	private String direccionE;
	
	@Column(name="nit")
	private String nitE;

	@Column(name="razon_social")
	private String razonSocial;

	@Column(name="slogan")
	private String sloganE;

	@Column(name="telefono")
	private String telefonoE;

	@Column(name="url_logo")
	private String urlLogo;

	//bi-directional many-to-one association to Ciudad
	@ManyToOne
	@JoinColumn(name="id_ciudad")
	private Ciudad ciudad;

	//bi-directional many-to-one association to Producto
	@OneToMany(mappedBy="empresa")
	private List<Producto> productos;

	//bi-directional many-to-one association to Usuario
	@OneToMany(mappedBy="empresa")
	private List<Usuario> usuarios;
	
	@ManyToMany(mappedBy="empresas")
	private List<Categoria> categorias;
	
	public Empresa() {
	}

	public int getIdEmpresa() {
		return this.idEmpresa;
	}

	public void setIdEmpresa(int idEmpresa) {
		this.idEmpresa = idEmpresa;
	}

	public boolean getActivo() {
		return this.activoE;
	}

	public void setActivo(boolean  activo) {
		this.activoE = activo;
	}

	public String getCorreoElectronico() {
		return this.correoElectronico;
	}

	public void setCorreoElectronico(String correoElectronico) {
		this.correoElectronico = correoElectronico;
	}

	public String getDireccion() {
		return this.direccionE;
	}

	public void setDireccion(String direccion) {
		this.direccionE = direccion;
	}

	public String getNit() {
		return this.nitE;
	}

	public void setNit(String nit) {
		this.nitE = nit;
	}

	public String getRazonSocial() {
		return this.razonSocial;
	}

	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}

	public String getSlogan() {
		return this.sloganE;
	}

	public void setSlogan(String slogan) {
		this.sloganE = slogan;
	}

	public String getTelefono() {
		return this.telefonoE;
	}

	public void setTelefono(String telefono) {
		this.telefonoE = telefono;
	}

	public String getUrlLogo() {
		return this.urlLogo;
	}

	public void setUrlLogo(String urlLogo) {
		this.urlLogo = urlLogo;
	}

	public Ciudad getCiudad() {
		return this.ciudad;
	}

	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}

	public List<Producto> getProductos() {
		return this.productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public Producto addProducto(Producto producto) {
		getProductos().add(producto);
		producto.setEmpresa(this);

		return producto;
	}

	public Producto removeProducto(Producto producto) {
		getProductos().remove(producto);
		producto.setEmpresa(null);

		return producto;
	}

	public List<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public Usuario addUsuario(Usuario usuario) {
		getUsuarios().add(usuario);
		usuario.setEmpresa(this);

		return usuario;
	}

	public Usuario removeUsuario(Usuario usuario) {
		getUsuarios().remove(usuario);
		usuario.setEmpresa(null);

		return usuario;
	}
	
	public List<Categoria> getCategorias() {
		return this.categorias;
	}

	public void setCategorias(List<Categoria> categorias) {
		this.categorias = categorias;
	}
}