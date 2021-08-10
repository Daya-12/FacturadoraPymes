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
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Service.IClienteService;

@RestController
@RequestMapping(path = "/cliente")
public class ClienteControlador {
	private final IClienteService clienteService;

	@Autowired
	public ClienteControlador(IClienteService clienteService) {
		this.clienteService = clienteService;
	}

	@PostMapping(value = "/agregar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarClientes(@RequestBody ClienteModel cliente) {
		return clienteService.crearCliente(cliente);
	}

	@PostMapping(value = "/validar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel validarClientes(@RequestBody ClienteModel cliente) {
		return clienteService.validarCliente(cliente);
	}

	@GetMapping(value = "/consultarCustomersSaldo")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ClienteModel> mostrarClientesSaldoFact() {
		return clienteService.mostrarClientesSaldoF();
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ClienteModel> mostrarClientes() {
		return clienteService.mostrarClientes();
	}
	
	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizarCliente(@RequestBody ClienteModel cliente) {
		return clienteService.actualizarCliente(cliente);
	}
	
	@DeleteMapping(value = "/eliminar/{idCliente}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public String eliminarCliente(@PathVariable("idCliente") Integer idCliente) {
		return clienteService.eliminarCliente(idCliente);
	}
	
}
