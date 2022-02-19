package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;
import com.FacturadoraPymes.FacturadoraPymes.Models.DetalleModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.DetallesRecibirModel;

public interface IMapperDetalle {
	public Detalle recibirDetalles (DetallesRecibirModel detalleModel);

}
