package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;


public class MapperUsuario implements IMapperUsuario {

	@Override
	public UsuarioModel mostrarUsuarios(Usuario usuarios) {
		Empresa empresaEntity = usuarios.getEmpresa();
		
		UsuarioModel usuario = new UsuarioModel();
		usuario.setId(usuarios.getIdUsuario());
		usuario.setNombre(usuarios.getNombreUser());
		usuario.setId_empresa(empresaEntity.getIdEmpresa());
		usuario.setNombre_empresa(empresaEntity.getRazonSocial());
		usuario.setCorreo(usuarios.getCorreoUser());
		usuario.setTelefono(usuarios.getTelefonoUser());
		usuario.setNivel(usuarios.getNivelUser());
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

}
