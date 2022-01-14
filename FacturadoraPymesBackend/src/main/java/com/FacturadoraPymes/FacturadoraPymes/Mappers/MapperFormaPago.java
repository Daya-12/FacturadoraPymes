package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Formapago;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFormaPago;
import com.FacturadoraPymes.FacturadoraPymes.Models.FormaPagoModel;

public class MapperFormaPago implements IMapperFormaPago{

	@Override
	public FormaPagoModel mostrarFormasPago(Formapago formaPago) {
		FormaPagoModel formaPagoM=new FormaPagoModel();
		formaPagoM.setId(formaPago.getIdformapago());
		formaPagoM.setNombre(formaPago.getNombreformapago());
		formaPagoM.setActivo(formaPago.getActivoformapago());
		return formaPagoM;
	}

}
