package com.FacturadoraPymes.FacturadoraPymes.Utils;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

public class Actualizaciones {
	public Usuario validarActualizacionUsuario(Usuario usuarioEntity, UsuarioModel usuarioModel) {
		if (!(usuarioModel.getCorreo().equals(usuarioEntity.getCorreoUser()))) {
			usuarioEntity.setCorreoUser(usuarioModel.getCorreo());
		}

		if (!(usuarioModel.getTelefono().equals(usuarioEntity.getTelefonoUser()))) {
			usuarioEntity.setTelefonoUser(usuarioModel.getTelefono());
		}

		if (usuarioModel.getNivel() != usuarioEntity.getNivelUser()) {
			usuarioEntity.setNivelUser(usuarioModel.getNivel());
		}

		return usuarioEntity;
	}
}
