package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;


public class MapperUsuario implements IMapperUsuario {

	@Override
	public UsuarioModel mostrarUsuarios(Usuario usuarios) {
		
		EmpresaModel empresa = new EmpresaModel();
		Empresa empresaEntity = usuarios.getEmpresa();
		
		CiudadModel ciudad = new CiudadModel();
		Ciudad ciudadEntity = empresaEntity.getCiudad();
		ciudad.setId(ciudadEntity.getIdCiudad());
		ciudad.setNombre(ciudadEntity.getNombreCiudad());
		
		empresa.setId(empresaEntity.getIdEmpresa());
		empresa.setRazonSocial(empresaEntity.getRazonSocial());
		empresa.setSlogan(empresaEntity.getSlogan());
		empresa.setNit(empresaEntity.getNit());
		empresa.setUrlLogo(empresaEntity.getUrlLogo());
		empresa.setCorreoElectronico(empresaEntity.getCorreoElectronico());
		empresa.setDireccion(empresaEntity.getDireccion());
		empresa.setCiudad(ciudad);
		empresa.setTelefono(empresaEntity.getTelefono());
		empresa.setActivo(empresaEntity.getActivo());
		
		UsuarioModel usuario = new UsuarioModel();
		usuario.setId(usuarios.getIdUsuario());
		usuario.setNombre(usuarios.getNombreUser());
		usuario.setCorreo(usuarios.getCorreoUser());
		usuario.setPass(usuarios.getPassUser());
		usuario.setTelefono(usuarios.getTelefonoUser());
		usuario.setNivel(usuarios.getNivelUser());
		usuario.setEmpresa(empresa);
		usuario.setActivo(usuarios.getActivoUser());
		return usuario;
	}

}
