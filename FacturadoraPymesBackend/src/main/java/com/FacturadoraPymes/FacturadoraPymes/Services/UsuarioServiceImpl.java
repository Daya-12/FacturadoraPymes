package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IUsuarioRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Actualizaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;

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
	public UsuarioModel iniciarSesion(String email,String pass) {
		String passAsegurada=validaciones.asegurarPass(pass);
		String passCifrada=validaciones.cifrarPassAES(passAsegurada);
		Optional<Usuario> usuarioEntity = validaciones.validarSesion(usuarioRepository, email, passCifrada);
		return mapperUsuario.mostrarUsuarios(usuarioEntity.get());
	}
	
	
	@Override
	public List<UsuarioModel> mostrarUsuarios(int idEmpresa) {
		List<UsuarioModel> usuarios = new LinkedList<>();
		List<Usuario> usuarioEntities = usuarioRepository.consultarUsuarios(idEmpresa,true);
		usuarios = StreamSupport.stream(usuarioEntities.spliterator(), false).map((usuario) -> {
			return mapperUsuario.mostrarUsuarios(usuario);
		}).collect(Collectors.toList());
		return usuarios;
	}
	
	@Override
	public MensajeModel crearUsuario(UsuarioModel usuario) {
		MensajeModel mensajeModel = new MensajeModel();
		Usuario usuarioEntity = new Usuario();
		String passAsegurada;
		String passCifrada;
		boolean validarCorreo = validaciones.validarCorreo(usuarioRepository, usuario.getCorreo());
		Empresa empresa=new Empresa();
		empresa.setIdEmpresa(usuario.getEmpresa().getId());
		if (!validarCorreo) {
			usuarioEntity.setIdUsuario(usuario.getId());
			usuarioEntity.setNombreUser(usuario.getNombre());
			usuarioEntity.setCorreoUser(usuario.getCorreo());
			passAsegurada=validaciones.asegurarPass(usuario.getPass());
			passCifrada=validaciones.cifrarPassAES(passAsegurada);
			usuarioEntity.setPassUser(passCifrada);
			usuarioEntity.setTelefonoUser(usuario.getTelefono());
			usuarioEntity.setNivelUser(usuario.getNivel());
			usuarioEntity.setEmpresa(empresa);
			usuarioEntity.setActivoUser(true);
			usuarioRepository.save(usuarioEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El usuario no se pudo registrar");
	}

	@Override
	public boolean validarEmail(String email) {
		boolean validarCorreo = validaciones.validarCorreo(usuarioRepository, email);
		return validarCorreo;
	}

	@Override
	public boolean validarEmailDistinto(String email, int idUsuario) {
		boolean validarCorreoDistinto = validaciones.validarCorreoDistinto(usuarioRepository, email,idUsuario);
		return validarCorreoDistinto;
	}

	@Override
	public MensajeModel actualizar(UsuarioModel usuario) {
		boolean validarIdUsuario = validaciones.validarExistenciaUser(usuarioRepository, usuario.getId());
		if (validarIdUsuario) {
			Actualizaciones actualizacionUser = new Actualizaciones();
			MensajeModel mensajeModel = new MensajeModel();
			Optional<Usuario> usuarioConsult = usuarioRepository.findById(usuario.getId());
			Usuario usuarioEntity = usuarioConsult.get();
			actualizacionUser.validarActualizacionUsuario(usuarioEntity, usuario);
			usuarioRepository.save(usuarioEntity);
			mensajeModel.setMensaje(Constantes.ACTUALIZACION_EXITOSA);
			return mensajeModel;
		}
		return null;
	}

	@Override
	public MensajeModel eliminar(int idUser) {
		MensajeModel mensajeModel = new MensajeModel();
		List<Factura> facturas = usuarioRepository.facturasCreadasUsuario(idUser);
		boolean validarIdUsuario = validaciones.validarExistenciaUser(usuarioRepository, idUser);
		if(facturas.isEmpty() && validarIdUsuario) {
			usuarioRepository.deleteById(idUser);
		}else if(!facturas.isEmpty() && validarIdUsuario) {
			Optional<Usuario> usuarioConsult = usuarioRepository.findById(idUser);
			Usuario usuarioEntity = usuarioConsult.get();
			usuarioEntity.setActivoUser(false);
			usuarioRepository.save(usuarioEntity);
		}
	 mensajeModel.setMensaje(Constantes.ELIMINACION_EXITOSA);
	 return mensajeModel;
	}

	@Override
	public List<UsuarioModel> mostrarUsuariosPersonalizado(int idEmpresa) {
		List<UsuarioModel> usuarios = new LinkedList<>();
		List<Usuario> usuarioEntities = usuarioRepository.consultaPersonalizada(idEmpresa,true);
		usuarios = StreamSupport.stream(usuarioEntities.spliterator(), false).map((usuario) -> {
			return mapperUsuario.mostrarUsuarios(usuario);
		}).collect(Collectors.toList());
		return usuarios;
	}
	
	
}
