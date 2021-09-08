package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.FacturadoraPymes.FacturadoraPymes.IServices.ICiudadService;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;

@RestController
@RequestMapping(path = "/ciudad")
public class CiudadControlador {
	
	private final ICiudadService ciudadService;
	
	@Autowired
	public CiudadControlador(ICiudadService ciudadService) {
		this.ciudadService = ciudadService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<CiudadModel> mostrarCiudades() {
		return ciudadService.mostrarCiudades();
	}
}
