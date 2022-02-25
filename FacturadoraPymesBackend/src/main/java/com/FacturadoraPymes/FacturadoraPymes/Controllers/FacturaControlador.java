package com.FacturadoraPymes.FacturadoraPymes.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFacturaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultarReferencia;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaRegistroModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

@RestController
@RequestMapping(path = "/factura")
public class FacturaControlador {
	private final IFacturaService facturaService;

	@Autowired
	public FacturaControlador(IFacturaService facturaService) {
		this.facturaService = facturaService;
	}
	
	@GetMapping(value = "/obtenerReferencia/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public String obtenerReferencia(@PathVariable int idEmpresa) {
		return facturaService.obtenerReferencia(idEmpresa);
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrar(@RequestBody FacturaRegistroModel factura) {
		return facturaService.registrar(factura);
	}
	
	@GetMapping(value = "/consultarTabla/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<FacturaConsultaTablaModel> consultaTabla(@PathVariable int idEmpresa) {
		return facturaService.consultaTabla(idEmpresa);
	}
	
	@PatchMapping(value = "/anular",produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MensajeModel anular(@RequestBody FacturaConsultaTablaModel factura) {
		return facturaService.anular(factura);
	}
	
	@GetMapping(value = "/consultarPorReferencia/{referencia}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public FacturaConsultarReferencia consultarPorReferencia(@PathVariable String referencia) {
		return facturaService.consultarPorReferencia(referencia);
	}

}
