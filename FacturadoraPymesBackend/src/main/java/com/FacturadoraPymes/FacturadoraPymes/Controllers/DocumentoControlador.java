package com.FacturadoraPymes.FacturadoraPymes.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IDocumentoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.DocumentoModel;

@RestController
@RequestMapping(path = "/documento")
public class DocumentoControlador {
private final IDocumentoService documentoService;
	
	@Autowired
	public DocumentoControlador(IDocumentoService documentoService) {
		this.documentoService = documentoService;
	}
	
	@GetMapping(value = "/consultar")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public List<DocumentoModel> mostrarDocumentos() {
		return documentoService.mostrarDocumentos();
	}
	
}
