package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFormaPagoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.FormaPagoModel;

@RestController
@RequestMapping(path = "/formaPago")
public class FormaPagoControlador {
	private final IFormaPagoService formaPagoService;
	
	@Autowired
	public FormaPagoControlador(IFormaPagoService formaPagoService) {
		this.formaPagoService = formaPagoService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<FormaPagoModel> mostrarFormasPago() {
		return formaPagoService.mostrarFormasPago();
	}
}
