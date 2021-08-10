package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;
import com.ProcesoPagos.ProcesoPagos.Repository.IUsuarioRepository;
import com.ProcesoPagos.ProcesoPagos.Util.Actualizaciones;
import com.ProcesoPagos.ProcesoPagos.Util.Constantes;
import com.ProcesoPagos.ProcesoPagos.Util.Validaciones;
import com.ProcesoPagos.ProcesoPagos.Entity.Usuario;
import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperUsuario;

@Service
public class UsuarioServiceImpl implements IUsuarioService {
	private final IUsuarioRepository usuarioRepository;
	private final IMapperUsuario mapperUsuario;
	private final Validaciones validaciones;

	@Autowired
	public UsuarioServiceImpl(IUsuarioRepository usuarioRepository, IMapperUsuario mapperUsuario,
			Validaciones validaciones) {
		this.usuarioRepository = usuarioRepository;
		this.mapperUsuario = mapperUsuario;
		this.validaciones = validaciones;
	}

	@Override
	public UsuarioModel validarUsuario(UsuarioModel usuario) {
		Optional<Usuario> usuarioEntity = validaciones.validarLogin(usuarioRepository, usuario);
		return mapperUsuario.mostrarUsuarios(usuarioEntity.get());
	}

	@Override
	public MensajeModel crearUsuario(UsuarioModel usuario) {
		MensajeModel mensajeModel = new MensajeModel();
		Usuario usuarioEntity = new Usuario();
		boolean validarIdUsuario = validaciones.validarIdUsuario(usuarioRepository, usuario);
		boolean validarCorreo = validaciones.validarCorreo(usuarioRepository, usuario);
		if (validarIdUsuario && validarCorreo) {
			usuarioEntity.setIdUsuario(usuario.getId());
			usuarioEntity.setNombreUser(usuario.getNombre());
			usuarioEntity.setCorreoUser(usuario.getCorreo());
			usuarioEntity.setPassUser(String.valueOf(usuario.getPass().hashCode()));
			usuarioEntity.setTelefonoUser(usuario.getTelefono());
			usuarioEntity.setNivelUser(usuario.getNivel());
			usuarioRepository.save(usuarioEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El usuario no se pudo registrar");
	}

	@Override
	public List<UsuarioModel> mostrarUsuarios() {
		List<UsuarioModel> usuarios = new LinkedList<>();
		Iterable<Usuario> usuarioEntities = usuarioRepository.findAll();
		usuarios = StreamSupport.stream(usuarioEntities.spliterator(), false).map((usuario) -> {
			return mapperUsuario.mostrarUsuarios(usuario);
		}).collect(Collectors.toList());
		return usuarios;
	}

	@Override
	public MensajeModel dardeBajaUsuario(Integer idUser) {
		MensajeModel mensajeModel = new MensajeModel();
		boolean validarIdUsuario = validaciones.validarExistenciaUser(usuarioRepository, idUser);
		if (validarIdUsuario) {
			usuarioRepository.deleteById(idUser);
			mensajeModel.setMensaje(Constantes.ELIMINAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El usuario no se pudo eliminar");
	}

	@Override
	public MensajeModel actualizarUser(UsuarioModel usuario) {
		boolean validarCorreo = validaciones.validarExistenciaCorreo(usuarioRepository, usuario);
		boolean validarIdUsuario = validaciones.validarExistenciaUser(usuarioRepository, usuario.getId());
		if (validarIdUsuario && validarCorreo) {
			Actualizaciones actualizacionUser = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Usuario> usuarioConsult = usuarioRepository.findById(usuario.getId());
			Usuario usuarioEntity = usuarioConsult.get();
			actualizacionUser.validarActualizacionUsuario(usuarioEntity, usuario);
			usuarioRepository.save(usuarioEntity);
			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		} else
			throw new NoSuchElementException("No fue posible actualizar el usuario");
	}

}
