package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModelPersonalizado;


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

	@Override
	public Usuario recibirUsuarios(UsuarioModel usuarioModel) {
		Usuario usuario = new Usuario();
		usuario.setIdUsuario(usuarioModel.getId());
		usuario.setNombreUser(usuarioModel.getNombre());
		usuario.setCorreoUser(usuarioModel.getCorreo());
		usuario.setPassUser(usuarioModel.getPass());
		usuario.setTelefonoUser(usuarioModel.getTelefono());
		usuario.setNivelUser(usuarioModel.getNivel());
		usuario.setActivoUser(usuarioModel.isActivo());
		return usuario;
	}

	@Override
	public UsuarioModelPersonalizado mostrarUsuariosPersonalizado(Usuario usuario, String cantidad ) {
		
		Empresa empresaEntity = usuario.getEmpresa();
		
		UsuarioModelPersonalizado usuarioModel = new UsuarioModelPersonalizado();
		usuarioModel.setId(usuario.getIdUsuario());
		usuarioModel.setNombre(usuario.getNombreUser());
		usuarioModel.setCorreo(usuario.getCorreoUser());
		usuarioModel.setTelefono(usuario.getTelefonoUser());
		usuarioModel.setNivel(usuario.getNivelUser());
		usuarioModel.setId_empresa(empresaEntity.getIdEmpresa());
		usuarioModel.setActivo(usuario.getActivoUser());
		usuarioModel.setFacturas(Integer.parseInt(cantidad));
		return usuarioModel;
	}
	


}
