package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;


public class MapperEmpresa implements IMapperEmpresa{

	@Override
	public EmpresaModel mostrarEmpresas(Empresa empresas) {
		CiudadModel ciudad = new CiudadModel();
		Ciudad ciudadEntity = empresas.getCiudad();
		ciudad.setId(ciudadEntity.getIdCiudad());
		ciudad.setNombre(ciudadEntity.getNombreCiudad());
		
		EmpresaModel empresa = new EmpresaModel();
		empresa.setId(empresas.getIdEmpresa());
		empresa.setRazonSocial(empresas.getRazonSocial());
		empresa.setSlogan(empresas.getSlogan());
		empresa.setNit(empresas.getNit());
		empresa.setUrlLogo(empresas.getUrlLogo());
		empresa.setCorreoElectronico(empresas.getCorreoElectronico());
		empresa.setDireccion(empresas.getDireccion());
		empresa.setCiudad(ciudad);
		empresa.setTelefono(empresas.getTelefono());
		empresa.setActivo(empresas.getActivo());
		
		return empresa;
	}

}
