package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IClienteService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

@RestController
@RequestMapping(path = "/cliente")
public class ClienteControlador {
	private final IClienteService clienteService;

	@Autowired
	public ClienteControlador(IClienteService clienteService) {
		this.clienteService = clienteService;
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarUsuario(@RequestBody ClienteModel cliente) {
		return clienteService.crear(cliente);
	}
}
