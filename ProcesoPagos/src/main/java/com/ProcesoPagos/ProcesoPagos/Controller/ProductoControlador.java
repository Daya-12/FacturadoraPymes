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
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;
import com.ProcesoPagos.ProcesoPagos.Service.IProductoService;

@RestController
@RequestMapping(path = "/producto")
public class ProductoControlador {

	private final IProductoService productoService;

	@Autowired
	public ProductoControlador(IProductoService productoService) {
		this.productoService = productoService;
	}

	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarProductos(@RequestBody ProductoModel producto) {
		return productoService.crearProducto(producto);
	}

	@GetMapping(value = "/mostrar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ProductoModel> mostrarProductos() {
		return productoService.mostrarProductos();
	}

	@GetMapping(value = "/consultarProdsC")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ProductoModel> mostrarProdsClientes() {
		return productoService.mostrarProdsClients();
	}

	@DeleteMapping(value = "/eliminar/{idProd}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel eliminarProducto(@PathVariable("idProd") Integer idProd) {
		return productoService.eliminarProducto(idProd);
	}

	@PutMapping(value = "/actualizar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel actualizarProd(@RequestBody ProductoModel producto) {
		return productoService.actualizarProd(producto);
	}
}
