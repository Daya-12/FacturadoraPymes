package com.FacturadoraPymes.FacturadoraPymes.Controllers;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaCategoriasActualizarModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MultiPartModel;

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
	
	@GetMapping(value = "/validarEmailEmpresa/{emailEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public boolean validarEmailEmpresa(@PathVariable String emailEmpresa) {
		return empresaService.validarEmailEmpresa(emailEmpresa);
	}
	
	@PostMapping(value = "/registrar", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.CREATED)
	public MensajeModel registrarEmpresa(@RequestBody EmpresaModel empresa) {
		return empresaService.crearEmpresa(empresa);
	}
	
	@GetMapping(value = "/consultarLogo/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public MultiPartModel consultarLogo(@PathVariable int idEmpresa) {
		MultipartFile n=empresaService.consultarLogo(idEmpresa);
		MultiPartModel np=new MultiPartModel();
		
		try {
			np.setName(n.getName());
			np.setOriginalFilename(n.getOriginalFilename());
			np.setContentType(n.getContentType());
			np.setBytes(n.getBytes());
			np.setSize(n.getSize());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return np;
	}
	
	
	@GetMapping(value = "/buscarPorId/{idEmpresa}")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public EmpresaModel buscarPorId(@PathVariable int idEmpresa) {
		return empresaService.buscarPorId(idEmpresa);
	}
	
	@PutMapping(value = "/actualizarCategorias", produces = "application/json", consumes = "application/json")
	@CrossOrigin
	@ResponseStatus(code = HttpStatus.OK)
	public int actualizarCategorias(@RequestBody EmpresaCategoriasActualizarModel empresa) {
		return empresaService.actualizarCategorias(empresa);
	}
}
