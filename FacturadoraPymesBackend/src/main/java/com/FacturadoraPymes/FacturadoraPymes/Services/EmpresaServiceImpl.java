package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;


@Service
public class EmpresaServiceImpl implements IEmpresaService{
	
	private final IEmpresaRepository empresaRepository;
	private final IMapperEmpresa mapperEmpresa;
	private final IUsuarioService usuarioService;
	private final Validaciones validaciones;
	
	@Autowired
	public EmpresaServiceImpl(IEmpresaRepository empresaRepository, IMapperEmpresa mapperEmpresa,
			Validaciones validaciones,IUsuarioService usuarioService) {
		this.empresaRepository = empresaRepository;
		this.mapperEmpresa = mapperEmpresa;
		this.validaciones = validaciones;
		this.usuarioService= usuarioService;
	}
	
	@Override
	public List<EmpresaModel> mostrarEmpresas() {
		List<EmpresaModel> empresas = new LinkedList<>();
		Iterable<Empresa> empresaEntities = empresaRepository.findAll();
		empresas = StreamSupport.stream(empresaEntities.spliterator(), false).map((empresa) -> {
			return mapperEmpresa.mostrarEmpresas(empresa);
		}).collect(Collectors.toList());
		return empresas;
	}
	
	@Override
	public Optional<Empresa> validarEmpresa(UsuarioModel usuario) {
		Optional<Empresa> empresa = empresaRepository.findById(usuario.getEmpresa().getId());
		if (!empresa.isPresent()) {
			throw new NoSuchElementException(Constantes.EMPRESA_INEXISTENTE);
		}
		return empresa;
	}

	@Override
	public MensajeModel crearEmpresa(EmpresaModel empresa) {
		MensajeModel mensajeModel = new MensajeModel();
		Empresa empresaEntity = new Empresa();
		Ciudad ciudadEntity = new Ciudad();
		ciudadEntity.setIdCiudad(empresa.getCiudad().getId());
		
		MapperCategoria mapperCategorias = new MapperCategoria();
		List<Categoria> categorias = new LinkedList<>();
		for (CategoriaModel categoriaModel : empresa.getCategorias()) {
			categorias.add(mapperCategorias.recibirCategorias(categoriaModel));
		}	
		empresaEntity.setIdEmpresa(empresa.getId());
		empresaEntity.setRazonSocial(empresa.getRazonSocial());
		empresaEntity.setSlogan(empresa.getSlogan());
		empresaEntity.setNit(empresa.getNit());
		empresaEntity.setUrlLogo(empresa.getUrlLogo());
		empresaEntity.setCorreoElectronico(empresa.getCorreoElectronico());
		empresaEntity.setDireccion(empresa.getDireccion());
		empresaEntity.setCiudad(ciudadEntity);
		empresaEntity.setTelefono(empresa.getTelefono());
		empresaEntity.setActivo(empresa.isActivo());
		empresaEntity.setCategorias(categorias);
		empresaRepository.save(empresaEntity);
		
		
		Optional<Empresa> empresaEn=empresaRepository.validarRazonSocial(empresa.getRazonSocial());
		if (empresaEn.isPresent()) {
			EmpresaModel empresaModelo= new EmpresaModel();
			empresaModelo= mapperEmpresa.mostrarEmpresas(empresaEn.get());
			empresa.getUsuario().setEmpresa(empresaModelo);
		usuarioService.crearUsuario(empresa.getUsuario());
		}
		mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
		return mensajeModel;
	}

	@Override
	public boolean validarNombreEmpresa(String nombreEmpresa) {
		boolean validarEmpresa = validaciones.validarEmpresa(empresaRepository, nombreEmpresa);
		return validarEmpresa;
	}
	
	@Override
	public boolean validarIdentificacionEmpresa(String identificacionEmpresa) {
		boolean validarEmpresa = validaciones.validarIdentificacionEmpresa(empresaRepository, identificacionEmpresa);
		return validarEmpresa;
	}

	@Override
	public boolean registrarLogo(String razonSocial,MultipartFile imagen) {
		 if (!imagen.isEmpty()) {
	            Path directorioImagenes=Path.of("src//main//resources//static/logos");
	            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
	            try {	            	  
					byte[] bytesImg=imagen.getBytes();
					String replaceName=imagen.getContentType().replace("image/", razonSocial+".");
;					Path rutaCompleta= Paths.get(rutaAbsoluta+"//"+replaceName);
					Files.write(rutaCompleta, bytesImg);
					return true;
				} catch (IOException e) {
					e.printStackTrace();
					return false;
				}
	            
	        } else {
	            return false;
	        }
	}
}
