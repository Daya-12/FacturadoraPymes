package com.FacturadoraPymes.FacturadoraPymes.Controllers;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

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
	
	@PostMapping(value = "/registrarLogo", produces = "application/json",consumes = "multipart/form-data")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public boolean registrarLogo(@RequestParam("nombreEmpresa") String razonSocial,@RequestParam("imagen") MultipartFile imagen ) {
		return empresaService.registrarLogo(razonSocial,imagen);
	}
	
	@GetMapping(value = "/validarNombreEmpresa/{nombreEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarNombreEmpresa(@PathVariable String nombreEmpresa) {
		return empresaService.validarNombreEmpresa(nombreEmpresa);
	}
	
	@GetMapping(value = "/validarIdentificacionEmpresa/{identificacionEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarIdentificacionEmpresa(@PathVariable String identificacionEmpresa) {
		return empresaService.validarIdentificacionEmpresa(identificacionEmpresa);
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarEmpresa(@RequestBody EmpresaModel empresa) {
		return empresaService.crearEmpresa(empresa);
	}
}
