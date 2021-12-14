package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModelPersonalizado;

public interface IMapperUsuario {
	public UsuarioModel mostrarUsuarios (Usuario usuarios);
	public UsuarioModelPersonalizado mostrarUsuariosPersonalizado (Usuario usuario, String cantidad);
	public Usuario recibirUsuarios (UsuarioModel usuarioModel);
}
