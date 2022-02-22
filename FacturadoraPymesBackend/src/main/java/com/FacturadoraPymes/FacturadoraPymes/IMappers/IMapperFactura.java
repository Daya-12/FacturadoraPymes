package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;

public interface IMapperFactura {
	public FacturaConsultaTablaModel mostrarFacturasTabla (Factura factura);

}
