package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IImpuestoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ImpuestoModel;

@RestController
@RequestMapping(path = "/impuesto")
public class ImpuestoControlador {
	private final IImpuestoService impuestoService;
	
	@Autowired
	public ImpuestoControlador(IImpuestoService impuestoService) {
		this.impuestoService = impuestoService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<ImpuestoModel> mostrarImpuestos() {
		return impuestoService.mostrarImpuestos();
	}

}
