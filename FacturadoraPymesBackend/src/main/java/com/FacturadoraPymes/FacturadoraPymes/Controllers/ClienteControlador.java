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
import com.FacturadoraPymes.FacturadoraPymes.IServices.IClienteService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;
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
	public MensajeModel registrar(@RequestBody ClienteModel cliente) {
		return clienteService.crear(cliente);
	}
	
	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizar(@RequestBody ClienteModel cliente) {
		return clienteService.actualizar(cliente);
	}
	
	@GetMapping(value = "/validarIdentificacion/{numIdentificacion}/{idTipo}/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarIdentificacion(@PathVariable String numIdentificacion,@PathVariable int idTipo,@PathVariable int idEmpresa) {
		return clienteService.validarIdentificacion(numIdentificacion,idTipo,idEmpresa);
	}
	
	@GetMapping(value = "/validarNombre/{nombre}/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarNombre(@PathVariable String nombre,@PathVariable int idEmpresa) {
		return clienteService.validarNombre(nombre,idEmpresa);
	}
	
	@GetMapping(value = "/consultar/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ClienteModelPersonalizado> mostrarClientes(@PathVariable int idEmpresa) {
		return clienteService.mostrarClientes(idEmpresa);
	}
	
	@DeleteMapping(value = "/eliminar/{idCliente}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public int eliminar(@PathVariable("idCliente") int idCliente) {
		return clienteService.eliminar(idCliente);
	}
	
	@GetMapping(value = "/consultaPersonalizada/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ClienteModelConsultaP> mostrarClientesPersonalizado(@PathVariable int idEmpresa) {
		return clienteService.mostrarClientesPersonalizado(idEmpresa);
	}
	
}
