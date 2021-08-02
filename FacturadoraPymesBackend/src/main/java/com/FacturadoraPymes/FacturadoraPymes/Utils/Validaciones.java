package com.FacturadoraPymes.FacturadoraPymes.Utils;

import java.util.NoSuchElementException;
import java.util.Optional;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IUsuarioRepository;

public class Validaciones {
	
	public Optional<Usuario> validarSesion(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioEntity = usuarioRepository.validarSesion(usuarioModel.getCorreo(),
				String.valueOf(usuarioModel.getPass().hashCode()));
		if (!usuarioEntity.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_INEXISTENTE);
		} else
			return usuarioEntity;
	}
	
	public boolean validarCorreo(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.validarCorreo(usuarioModel.getCorreo());
		if (usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_EXISTENTE);
		} else
			return true;
	}
}
