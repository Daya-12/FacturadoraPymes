package com.ProcesoPagos.ProcesoPagos.Entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the recibo database table.
 * 
 */
@Embeddable
public class ReciboPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="id_factura", insertable=false, updatable=false)
	private int idFactura;

	@Column(name="id_cliente", insertable=false, updatable=false)
	private int idCliente;

	public ReciboPK() {
	}
	public int getIdFactura() {
		return this.idFactura;
	}
	public void setIdFactura(int idFactura) {
		this.idFactura = idFactura;
	}
	public int getIdCliente() {
		return this.idCliente;
	}
	public void setIdCliente(int idCliente) {
		this.idCliente = idCliente;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ReciboPK)) {
			return false;
		}
		ReciboPK castOther = (ReciboPK)other;
		return 
			(this.idFactura == castOther.idFactura)
			&& (this.idCliente == castOther.idCliente);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idFactura;
		hash = hash * prime + this.idCliente;
		
		return hash;
	}
}