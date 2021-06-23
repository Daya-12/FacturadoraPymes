package com.FacturadoraPymes.FacturadoraPymes.Entities;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.List;


@Entity
@NamedQuery(name="Factura.findAll", query="SELECT f FROM Factura f")
public class Factura implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_factura")
	private int idFactura;

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_emision")
	private Date fechaEmision;

	@Temporal(TemporalType.DATE)
	@Column(name="fecha_vencimiento")
	private Date fechaVencimiento;

	@Column(name="formaPago_personalizada")
	private String formaPagoPers;

	@Column(name="id_impuesto")
	private int idImpuesto;

	@Column(name="ref_pago")
	private String refPago;

	@Column(name="subtotal_factura")
	private double subtotalFactura;

	@Column(name="total_fact")
	private double totalFact;

	@Column(name="valor_letras")
	private String valorLetras;

	//bi-directional many-to-one association to Detalle
	@OneToMany(mappedBy="factura")
	private List<Detalle> detalles;

	//bi-directional many-to-one association to Estado
	@ManyToOne
	@JoinColumn(name="id_estado")
	private Estado estado;
	
	//bi-directional many-to-one association to formaPago
	@ManyToOne
	@JoinColumn(name="id_formaPago")
	private Formapago formaPago;
	
	//bi-directional many-to-one association to Ciudad
	@ManyToOne
	@JoinColumn(name="id_ciudad")
	private Ciudad ciudad;
	
	//bi-directional many-to-one association to Cliente
	@ManyToOne
	@JoinColumn(name="id_cliente")
	private Cliente cliente;
	
	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	
	
	//bi-directional many-to-many association to Impuesto
	@ManyToMany(mappedBy="facturas")
	private List<Impuesto> impuestos;

	public Factura() {
	}

	public int getIdFactura() {
		return this.idFactura;
	}

	public void setIdFactura(int idFactura) {
		this.idFactura = idFactura;
	}

	public Date getFechaEmision() {
		return this.fechaEmision;
	}

	public void setFechaEmision(Date fechaEmision) {
		this.fechaEmision = fechaEmision;
	}


	public Date getFechaVencimiento() {
		return this.fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public String getFormaPagoPersonalizada() {
		return this.formaPagoPers;
	}

	public void setFormaPagoPersonalizada(String formaPagoPersonalizada) {
		this.formaPagoPers = formaPagoPersonalizada;
	}

	public int getIdImpuesto() {
		return this.idImpuesto;
	}

	public void setIdImpuesto(int idImpuesto) {
		this.idImpuesto = idImpuesto;
	}

	public String getRefPago() {
		return this.refPago;
	}

	public void setRefPago(String refPago) {
		this.refPago = refPago;
	}

	public double getSubtotalFactura() {
		return this.subtotalFactura;
	}

	public void setSubtotalFactura(double subtotalFactura) {
		this.subtotalFactura = subtotalFactura;
	}


	public double getTotalFact() {
		return this.totalFact;
	}

	public void setTotalFact(double totalFact) {
		this.totalFact = totalFact;
	}

	public String getValorLetras() {
		return this.valorLetras;
	}

	public void setValorLetras(String valorLetras) {
		this.valorLetras = valorLetras;
	}

	public List<Detalle> getDetalles() {
		return this.detalles;
	}

	public void setDetalles(List<Detalle> detalles) {
		this.detalles = detalles;
	}

	public Detalle addDetalle(Detalle detalle) {
		getDetalles().add(detalle);
		detalle.setFactura(this);

		return detalle;
	}

	public Detalle removeDetalle(Detalle detalle) {
		getDetalles().remove(detalle);
		detalle.setFactura(null);

		return detalle;
	}

	public Estado getEstado() {
		return this.estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	
	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public Ciudad getCiudad() {
		return this.ciudad;
	}

	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}
	
	public Cliente getCliente() {
		return this.cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	public Formapago getFormaPago() {
		return this.formaPago;
	}

	public void setFormaPago(Formapago formaPago) {
		this.formaPago = formaPago;
	}
	
	public List<Impuesto> getImpuestos() {
		return this.impuestos;
	}

	public void setImpuestos(List<Impuesto> impuestos) {
		this.impuestos = impuestos;
	}

}