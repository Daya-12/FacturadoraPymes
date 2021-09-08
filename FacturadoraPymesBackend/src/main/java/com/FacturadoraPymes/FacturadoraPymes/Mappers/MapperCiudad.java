package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;

public class MapperCiudad implements IMapperCiudad{

	@Override
	public CiudadModel mostrarCiudades(Ciudad ciudad) {
		CiudadModel ciudadM=new CiudadModel();
		ciudadM.setId(ciudad.getIdCiudad());
		ciudadM.setNombre(ciudad.getNombreCiudad());
		ciudadM.setActivo(ciudad.getActivoCiudad());
		return ciudadM;
	}

}
