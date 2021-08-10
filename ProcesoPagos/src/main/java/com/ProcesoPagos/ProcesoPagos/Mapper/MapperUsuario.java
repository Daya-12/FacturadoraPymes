package com.ProcesoPagos.ProcesoPagos.Mapper;

import com.ProcesoPagos.ProcesoPagos.Entity.Usuario;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;

public class MapperUsuario implements IMapperUsuario {

	@Override
	public UsuarioModel mostrarUsuarios(Usuario usuarios) {
		UsuarioModel usuario = new UsuarioModel();
		usuario.setId(usuarios.getIdUsuario());
		usuario.setNombre(usuarios.getNombreUser());
		usuario.setCorreo(usuarios.getCorreoUser());
		usuario.setPass(usuarios.getPassUser());
		usuario.setTelefono(usuarios.getTelefonoUser());
		usuario.setNivel(usuarios.getNivelUser());
		return usuario;
	}

}
