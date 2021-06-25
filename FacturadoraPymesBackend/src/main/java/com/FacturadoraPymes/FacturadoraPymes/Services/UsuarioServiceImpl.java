package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IUsuarioRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

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
	public List<UsuarioModel> mostrarUsuarios() {
		List<UsuarioModel> usuarios = new LinkedList<>();
		Iterable<Usuario> usuarioEntities = usuarioRepository.findAll();
		usuarios = StreamSupport.stream(usuarioEntities.spliterator(), false).map((usuario) -> {
			return mapperUsuario.mostrarUsuarios(usuario);
		}).collect(Collectors.toList());
		return usuarios;
	}
	
	
}
