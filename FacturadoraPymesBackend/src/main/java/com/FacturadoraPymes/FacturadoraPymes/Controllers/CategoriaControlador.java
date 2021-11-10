package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.ICategoriaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;

@RestController
@RequestMapping(path = "/categoria")

public class CategoriaControlador {
private final ICategoriaService categoriaService;
	
	@Autowired
	public CategoriaControlador(ICategoriaService categoriaService) {
		this.categoriaService = categoriaService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<CategoriaModel> mostrarCategorias() {
		return categoriaService.mostrarCategorias();
	}
}
