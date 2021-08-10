package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the categoriaprod database table.
 * 
 */
@Entity
@NamedQuery(name="Categoriaprod.findAll", query="SELECT c FROM Categoriaprod c")
public class Categoriaprod implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_categoria")
	private int idCategoria;

	@Column(name="nombre_categoria")
	private String nombreCategoria;

	//bi-directional many-to-one association to Producto
	@OneToMany(mappedBy="categoriaprod")
	private List<Producto> productos;

	public Categoriaprod() {
	}

	public int getIdCategoria() {
		return this.idCategoria;
	}

	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombreCategoria() {
		return this.nombreCategoria;
	}

	public void setNombreCategoria(String nombreCategoria) {
		this.nombreCategoria = nombreCategoria;
	}

	public List<Producto> getProductos() {
		return this.productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public Producto addProducto(Producto producto) {
		getProductos().add(producto);
		producto.setCategoriaprod(this);

		return producto;
	}

	public Producto removeProducto(Producto producto) {
		getProductos().remove(producto);
		producto.setCategoriaprod(null);

		return producto;
	}

}