package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the producto database table.
 * 
 */
@Entity
@NamedQuery(name="Producto.findAll", query="SELECT p FROM Producto p")
public class Producto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_producto")
	private int idProducto;

	@Column(name="nombre_producto")
	private String nombreProducto;

	@Column(name="valor_producto")
	private double valorProducto;

	//bi-directional many-to-one association to Detalle
	@OneToMany(mappedBy="producto")
	private List<Detalle> detalles;

	//bi-directional many-to-many association to Cliente
	@ManyToMany
	@JoinTable(
		name="prodclient"
		, joinColumns={
			@JoinColumn(name="id_producto")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_cliente")
			}
		)
	private List<Cliente> clientes;

	//bi-directional many-to-one association to Categoriaprod
	@ManyToOne
	@JoinColumn(name="id_categoria")
	private Categoriaprod categoriaprod;

	public Producto() {
	}

	public int getIdProducto() {
		return this.idProducto;
	}

	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}

	public String getNombreProducto() {
		return this.nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public double getValorProducto() {
		return this.valorProducto;
	}

	public void setValorProducto(double valorProducto) {
		this.valorProducto = valorProducto;
	}

	public List<Detalle> getDetalles() {
		return this.detalles;
	}

	public void setDetalles(List<Detalle> detalles) {
		this.detalles = detalles;
	}

	public Detalle addDetalle(Detalle detalle) {
		getDetalles().add(detalle);
		detalle.setProducto(this);
		return detalle;
	}

	public Detalle removeDetalle(Detalle detalle) {
		getDetalles().remove(detalle);
		detalle.setProducto(null);

		return detalle;
	}

	public List<Cliente> getClientes() {
		return this.clientes;
	}

	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	public Categoriaprod getCategoriaprod() {
		return this.categoriaprod;
	}

	public void setCategoriaprod(Categoriaprod categoriaprod) {
		this.categoriaprod = categoriaprod;
	}

}