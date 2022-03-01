package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;
import com.FacturadoraPymes.FacturadoraPymes.Models.DetallesRecibirModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultarReferencia;

public class MapperFactura implements IMapperFactura{

	@Override
	public FacturaConsultaTablaModel mostrarFacturasTabla(Factura factura) {
		FacturaConsultaTablaModel facturaM = new FacturaConsultaTablaModel();
		facturaM.setId(factura.getIdFactura());
		facturaM.setReferencia(factura.getRefPago());
		facturaM.setFechaEmision(factura.getFechaEmision());
		facturaM.setFechaVencimiento(factura.getFechaVencimiento());
		facturaM.setCiudad(factura.getCiudad().getNombreCiudad());
		facturaM.setCliente(factura.getCliente().getNombreCli());
		facturaM.setTotal(factura.getTotalFact());
		facturaM.setUsuario(factura.getUsuario().getNombreUser());
		facturaM.setEstado(factura.getEstado().getNombreEstado());
		return facturaM;
	}

	@Override
	public FacturaConsultarReferencia facturaPorReferencia(Factura factura) {
		FacturaConsultarReferencia facturaM = new FacturaConsultarReferencia();
		facturaM.setId(factura.getIdFactura());
		facturaM.setReferencia(factura.getRefPago());
		facturaM.setCiudad(factura.getCiudad().getNombreCiudad());
		
		ClienteModelPersonalizado clienteModel=new ClienteModelPersonalizado();
		clienteModel.setId(factura.getIdFactura());
		clienteModel.setNombre(factura.getCliente().getNombreCli());
		clienteModel.setId_tdocumento(factura.getCliente().getDocumento().getIdTdocumento());
		clienteModel.setNombre_tdocumento(factura.getCliente().getDocumento().getNombreTdocumento());
		clienteModel.setNum_documento(factura.getCliente().getNumDocumento());
		clienteModel.setDireccion(factura.getCliente().getDireccionCli());
		clienteModel.setId_ciudad(factura.getCliente().getCiudad().getIdCiudad());
		clienteModel.setNombre_ciudad(factura.getCliente().getCiudad().getNombreCiudad());
		clienteModel.setId_empresa(factura.getCliente().getEmpresa().getIdEmpresa());
		clienteModel.setCodPostal(factura.getCliente().getCodpostalCli());
		clienteModel.setTelefono(factura.getCliente().getTelefonoCli());
		clienteModel.setActivo(factura.getCliente().getActivo());
		
		facturaM.setCliente(clienteModel);
		facturaM.setUsuario(factura.getUsuario().getNombreUser());
		if(factura.getFormaPago()!=null) {
		facturaM.setFormaPago(factura.getFormaPago().getNombreformapago());
		}
		else {
			facturaM.setFormaPago(null);
		}
		facturaM.setFormaPagoPersonalizada(factura.getFormaPagoPersonalizada());
		facturaM.setFechaEmision(factura.getFechaEmision());
		facturaM.setFechaVencimiento(factura.getFechaVencimiento());
		facturaM.setSubtotal(factura.getSubtotalFactura());
		facturaM.setTotal(factura.getTotalFact());
		facturaM.setValorLetras(factura.getValorLetras());
		
		if(!factura.getImpuestos().isEmpty()) {
			facturaM.setImpuestoIva((factura.getSubtotalFactura() * factura.getImpuestos().get(0).getPorcImpuesto())/100);
		}
		else {
			facturaM.setImpuestoIva(0);
		}
		
		List<DetallesRecibirModel> detallesFactura=new LinkedList<>();
		MapperDetalle mapperDetalle=new MapperDetalle();
		detallesFactura = StreamSupport.stream(factura.getDetalles().spliterator(), false).map((detalle) -> {
			return mapperDetalle.entregarDetalles(detalle);
		}).collect(Collectors.toList());
		
		facturaM.setDetalles(detallesFactura);
		facturaM.setEstado(factura.getEstado().getNombreEstado());
		return facturaM;
	}

}
