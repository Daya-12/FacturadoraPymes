package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultarReferencia;

public interface IMapperFactura {
	public FacturaConsultaTablaModel mostrarFacturasTabla (Factura factura);
	public FacturaConsultarReferencia facturaPorReferencia (Factura factura);

}
