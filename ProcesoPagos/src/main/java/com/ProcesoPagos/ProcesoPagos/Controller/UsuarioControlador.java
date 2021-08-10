package com.ProcesoPagos.ProcesoPagos.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;
import com.ProcesoPagos.ProcesoPagos.Service.IUsuarioService;

@RestController
@RequestMapping(path = "/user")
public class UsuarioControlador {
	private final IUsuarioService usuarioService;

	@Autowired
	public UsuarioControlador(IUsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@PostMapping(value = "/validar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public UsuarioModel iniciarSesion(@RequestBody UsuarioModel usuario) {
		return usuarioService.validarUsuario(usuario);
	}

	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarUsuarios(@RequestBody UsuarioModel usuario) {
		return usuarioService.crearUsuario(usuario);
	}

	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<UsuarioModel> consultaUsuarios() {
		return usuarioService.mostrarUsuarios();
	}

	@DeleteMapping(value = "/eliminar/{idUser}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel eliminarUser(@PathVariable("idUser") Integer idUser) {
		return usuarioService.dardeBajaUsuario(idUser);
	}

	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizarUser(@RequestBody UsuarioModel usuario) {
		return usuarioService.actualizarUser(usuario);
	}
}
