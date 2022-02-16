package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Impuesto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperImpuesto;
import com.FacturadoraPymes.FacturadoraPymes.Models.ImpuestoModel;

public class MapperImpuesto implements IMapperImpuesto{
	@Override
	public ImpuestoModel mostrarImpuestos(Impuesto impuesto) {
		ImpuestoModel impuestoM=new ImpuestoModel();
		impuestoM.setId(impuesto.getIdImpuesto());
		impuestoM.setNombre(impuesto.getNombreImpuesto());
		impuestoM.setPorcentaje(impuesto.getPorcImpuesto());
		impuestoM.setActivo(impuesto.getActivoImpuesto());
		return impuestoM;
	}

}
