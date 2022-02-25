package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the detalle database table.
 * 
 */
@Embeddable
public class DetallePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="id_producto", insertable=false, updatable=false)
	private int idProducto;

	public DetallePK() {
	}
	
	public int getIdProducto() {
		return this.idProducto;
	}
	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof DetallePK)) {
			return false;
		}
		DetallePK castOther = (DetallePK)other;
		return  (this.idProducto == castOther.idProducto);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idProducto;
		
		return hash;
	}
}