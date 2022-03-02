package com.FacturadoraPymes.FacturadoraPymes.IServices;
import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaCategoriasActualizarModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

public interface IEmpresaService {
	List<EmpresaModel> mostrarEmpresas();
	Optional<Empresa> validarEmpresa(UsuarioModel usuario);
	boolean validarNombreEmpresa(String nombreEmpresa);
	boolean validarIdentificacionEmpresa(String identificacionEmpresa);
	boolean validarEmailEmpresa(String emailEmpresa);
	MensajeModel crearEmpresa(EmpresaModel empresa);
	boolean registrarLogo(String razonSocial,MultipartFile imagen);
	MultipartFile consultarLogo(int idEmpresa);
	EmpresaModel buscarPorId(int idEmpresa);
	int actualizarCategorias(EmpresaCategoriasActualizarModel empresa);
}
