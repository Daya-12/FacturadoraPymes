package com.FacturadoraPymes.FacturadoraPymes.IMappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Impuesto;
import com.FacturadoraPymes.FacturadoraPymes.Models.ImpuestoModel;

public interface IMapperImpuesto {
	public ImpuestoModel mostrarImpuestos (Impuesto impuesto);
	public Impuesto recibirImpuestos (ImpuestoModel impuestoModel);

}
