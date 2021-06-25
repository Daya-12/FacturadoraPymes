package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaControlador {
	
	private final IEmpresaService empresaService;
	
	@Autowired
	public EmpresaControlador(IEmpresaService empresaService) {
		this.empresaService = empresaService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<EmpresaModel> mostrarEmpresas() {
		return empresaService.mostrarEmpresas();
	}
}
