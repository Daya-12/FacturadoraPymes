package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IProductoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModelPersonalizado;

@RestController
@RequestMapping(path = "/producto")
public class ProductoControlador {
	
	private final IProductoService productoService;

	@Autowired
	public ProductoControlador(IProductoService productoService) {
		this.productoService = productoService;
	}
	
	@GetMapping(value = "/validarNombre/{nombre}/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarNombre(@PathVariable String nombre,@PathVariable int idEmpresa) {
		return productoService.validarNombre(nombre,idEmpresa);
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrar(@RequestBody ProductoModel producto) {
		return productoService.crear(producto);
	}
	
	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizar(@RequestBody ProductoModel producto) {
		return productoService.actualizar(producto);
	}
	
	@GetMapping(value = "/consultar/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ProductoModelPersonalizado> mostrarProductos(@PathVariable int idEmpresa) {
		return productoService.mostrarProductos(idEmpresa);
	}
	
	@GetMapping(value = "/validarDistintoNombre/{nombre}/{idProducto}/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarNombreDistinto(@PathVariable String nombre,@PathVariable int idProducto,@PathVariable int idEmpresa) {
		return productoService.validarNombreDistinto(nombre,idProducto,idEmpresa);
	}
}
