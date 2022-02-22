package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;

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

}
