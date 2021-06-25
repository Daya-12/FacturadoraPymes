package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

@RestController
@RequestMapping(path = "/user")
public class UsuarioControlador {

	private final IUsuarioService usuarioService;

	@Autowired
	public UsuarioControlador(IUsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<UsuarioModel> mostrarUsuarios() {
		return usuarioService.mostrarUsuarios();
	}
}
