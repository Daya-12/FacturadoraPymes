package com.FacturadoraPymes.FacturadoraPymes.Controllers;

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
import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModelPersonalizado;


@RestController
@RequestMapping(path = "/user")
public class UsuarioControlador {

	private final IUsuarioService usuarioService;

	@Autowired
	public UsuarioControlador(IUsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	
	@GetMapping(value = "/validar/{email}/{pass}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public UsuarioModel iniciarSesion(@PathVariable String email,@PathVariable String pass) {
		return usuarioService.iniciarSesion(email,pass);
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarUsuario(@RequestBody UsuarioModel usuario) {
		return usuarioService.crearUsuario(usuario);
	}

	@GetMapping(value = "/consultar/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<UsuarioModel> mostrarUsuarios(@PathVariable int idEmpresa) {
		return usuarioService.mostrarUsuarios(idEmpresa);
	}
	
	@GetMapping(value = "/validarEmail/{email}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarEmail(@PathVariable String email) {
		return usuarioService.validarEmail(email);
	}
	
	@GetMapping(value = "/validarDistintoEmail/{email}/{idUsuario}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarDistintoEmail(@PathVariable String email,@PathVariable int idUsuario) {
		return usuarioService.validarEmailDistinto(email,idUsuario);
	}
	
	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizarUser(@RequestBody UsuarioModel usuario) {
		return usuarioService.actualizar(usuario);
	}
	
	@DeleteMapping(value = "/eliminar/{idUser}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel eliminarUser(@PathVariable("idUser") Integer idUser) {
		return usuarioService.eliminar(idUser);
	}
	
	
	@GetMapping(value = "/consultaPersonalizada/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<UsuarioModelPersonalizado> mostrarUsuariosPersonalizado(@PathVariable int idEmpresa) {
		return usuarioService.mostrarUsuariosPersonalizado(idEmpresa);
	}
}
