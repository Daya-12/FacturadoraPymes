package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.swing.DefaultListModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IUsuarioService;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaCategoriasActualizarModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICategoriaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;


@Service
public class EmpresaServiceImpl implements IEmpresaService{
	
	private final IEmpresaRepository empresaRepository;
	private final ICategoriaRepository categoriaRepository;
	private final IMapperEmpresa mapperEmpresa;
	private final IUsuarioService usuarioService;
	private final Validaciones validaciones;
	private final String ruta ="src//main//resources//static/logos";
	
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	public EmpresaServiceImpl(IEmpresaRepository empresaRepository,ICategoriaRepository categoriaRepository, IMapperEmpresa mapperEmpresa,
			Validaciones validaciones,IUsuarioService usuarioService) {
		this.empresaRepository = empresaRepository;
		this.categoriaRepository=categoriaRepository;
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

	private String generarAbreviacion(String abreviacion) {
		 String palabra = ""; 
		 int caracteres = (int)(Math.random()*2)+3; 
		 for (int i=0; i<caracteres; i++){ 
				int codigoAscii = (int)Math.floor(Math.random()*(122 - 97)+97); 
				 palabra = palabra + (char)codigoAscii; 
		 }
		 return (abreviacion+palabra).toUpperCase();
	}
	@Override
	public MensajeModel crearEmpresa(EmpresaModel empresa) {
		
		 String subCadena = empresa.getRazonSocial().substring(0,3);
		 
		 String abreviacion=generarAbreviacion(subCadena);
		 boolean existenciAbrevitura= validaciones.validarAbreviacionEmpresa(empresaRepository, abreviacion);
		 
		 while(existenciAbrevitura) {
			 abreviacion=generarAbreviacion(subCadena);
			 existenciAbrevitura= validaciones.validarAbreviacionEmpresa(empresaRepository, abreviacion);
		 }
		
		if( (!existenciAbrevitura && validarNombreEmpresa(empresa.getRazonSocial())==false) && (validarIdentificacionEmpresa(empresa.getNit())==false) &&
			(validarEmailEmpresa(empresa.getCorreoElectronico())==false) && (usuarioService.validarEmail(empresa.getUsuario().getCorreo())==false)) {
		File directorio = new File(ruta);
		DefaultListModel defaultListModel = buscarLogo(directorio,empresa.getRazonSocial());
		empresa.setUrlLogo(defaultListModel.getElementAt(0).toString());
		
		MensajeModel mensajeModel = new MensajeModel();
		Empresa empresaEntity = new Empresa();
		Ciudad ciudadEntity = new Ciudad();
		ciudadEntity.setIdCiudad(empresa.getCiudad().getId());
		
		if(!empresa.getRazonSocial().isEmpty() && ciudadEntity.getIdCiudad() != 0) {
		empresaEntity.setIdEmpresa(empresa.getId());
		empresaEntity.setRazonSocial(empresa.getRazonSocial());
		empresaEntity.setSlogan(empresa.getSlogan());
		empresaEntity.setNit(empresa.getNit());
		empresaEntity.setUrlLogo(empresa.getUrlLogo());
		empresaEntity.setCorreoElectronico(empresa.getCorreoElectronico());
		empresaEntity.setAbreviacion(abreviacion);
		empresaEntity.setDireccion(empresa.getDireccion());
		empresaEntity.setCiudad(ciudadEntity);
		empresaEntity.setTelefono(empresa.getTelefono());
		empresaEntity.setActivo(empresa.isActivo());
		
		MapperCategoria mapperCategorias = new MapperCategoria();
		List<Categoria> categorias = new LinkedList<>();
		for (CategoriaModel categoriaModel : empresa.getCategorias()) {
			categorias.add(mapperCategorias.recibirCategorias(categoriaModel));
		}	
		empresaEntity.setCategorias(categorias);
		empresaRepository.save(empresaEntity);
		
		List<Empresa> empresaCatgs = new LinkedList<>();
		Categoria categoriaEntity = new Categoria();
		for (int i = 0; i < empresa.getCategorias().size(); i++) {
			int idCategoria = empresa.getCategorias().get(i).getId();
			Optional<Categoria> categoriasEntities = categoriaRepository.findById(idCategoria);
			categoriaEntity = categoriasEntities.get();
			empresaCatgs = categoriaEntity.getEmpresas();
			empresaCatgs.add(empresaEntity);
			categoriaEntity.setEmpresas(empresaCatgs);
		}
		categoriaRepository.save(categoriaEntity);
		
		Optional<Empresa> empresaEn=empresaRepository.validarRazonSocial(empresa.getRazonSocial());
		if (empresaEn.isPresent()) {
			EmpresaModel empresaModelo= new EmpresaModel();
			empresaModelo= mapperEmpresa.mostrarEmpresas(empresaEn.get());
			empresa.getUsuario().setEmpresa(empresaModelo);
		usuarioService.crearUsuario(empresa.getUsuario());
		mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
		return mensajeModel;
			}
		else {
			return null;
		}
		}
		else {
			return null;
		}
		}
		else {
			return null;
		}

	}

	@Override
	public boolean validarNombreEmpresa(String nombreEmpresa) {
		return validaciones.validarEmpresa(empresaRepository, nombreEmpresa);
	}
	
	@Override
	public boolean validarIdentificacionEmpresa(String identificacionEmpresa) {
		return validaciones.validarIdentificacionEmpresa(empresaRepository, identificacionEmpresa);
	}
	
	@Override
	public boolean validarEmailEmpresa(String emailEmpresa) {
		return validaciones.validarEmailEmpresa(empresaRepository, emailEmpresa);
	}

	@Override
	public boolean registrarLogo(String razonSocial,MultipartFile imagen) {
		 if (!imagen.isEmpty()) {
	            Path directorioImagenes=Path.of(ruta);
	            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
	            try {	            	  
					byte[] bytesImg=imagen.getBytes();
					String replaceName=imagen.getContentType().replace("image/", razonSocial+".");
					Path rutaCompleta= Paths.get(rutaAbsoluta+"//"+replaceName);
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
	
	private DefaultListModel buscarLogo(File directorio,String razonSocial) {
		DefaultListModel defaultListModel = new DefaultListModel ();
		if ( directorio.isDirectory() ) {   
            File[] ficheros = directorio.listFiles();           
            for ( File fichero : ficheros ) 
            {
                if( fichero.getName().toUpperCase().indexOf( razonSocial.toUpperCase() ) >= 0 )
                {                        
                    defaultListModel.addElement( fichero.getName() );
                }                  
            }
        }        
        return defaultListModel;
	}

	@Override
	public MultipartFile consultarLogo(int idEmpresa) {
		String razonSocial= empresaRepository.findById(idEmpresa).get().getRazonSocial();
        Path directorioImagenes=Path.of(ruta);
        String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
		String nombreFicheroCompleto="";
		File directorio = new File(ruta);
		DefaultListModel defaultListModel = buscarLogo(directorio,razonSocial);
		nombreFicheroCompleto=defaultListModel.getElementAt(0).toString();
		Path rutaCompleta= Paths.get(rutaAbsoluta+"//"+nombreFicheroCompleto);
		Resource resource=null;
		File file=null;
		try {
			file=resourceLoader.getResource("file:"+rutaCompleta.toString()).getFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
	    		   
        FileInputStream inputStream = null;
		try {
			inputStream = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
        byte[] bytes = null;
		try {
			bytes = new byte[inputStream.available()];
		} catch (IOException e) {
			e.printStackTrace();
		}
        try {
			inputStream.read(bytes, 0, inputStream.available());
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        InputStream inputt = new ByteArrayInputStream(bytes);
        MultipartFile filemu=null;
		try {
			filemu = new MockMultipartFile(nombreFicheroCompleto,nombreFicheroCompleto,"image/"+nombreFicheroCompleto.replace(razonSocial+".", ""), inputt);
		} catch (IOException e) {
			e.printStackTrace();
		}
        		
        return filemu;
	}

	@Override
	public EmpresaModel buscarPorId(int idEmpresa) {
		Optional<Empresa> empresa = empresaRepository.findById(idEmpresa);		
		return mapperEmpresa.mostrarEmpresas(empresa.get());
	}

	@Override
	public int actualizarCategorias(EmpresaCategoriasActualizarModel empresa) {
		int retorno=0;
		Empresa empresaEntity = new Empresa();
		empresaEntity= empresaRepository.findById(empresa.getId()).get();
		
		MapperCategoria mapperCategorias = new MapperCategoria();
		List<Categoria> categorias = new LinkedList<>();
		for (CategoriaModel categoriaModel : empresa.getCategorias()) {
			categorias.add(mapperCategorias.recibirCategorias(categoriaModel));
		}	
		
		ArrayList<Integer> list1= new ArrayList<>();
		ArrayList<Integer> list2= new ArrayList<>();
		
		empresaEntity.getCategorias().forEach((p)-> {
			list1.add(p.getIdCategoria());
		});
		
		categorias.forEach((p)-> {
			list2.add(p.getIdCategoria());
		});
		
		ArrayList<Integer> listFinal = new ArrayList<>();
		listFinal.addAll(list1);
		listFinal.addAll(list2);
		
		ArrayList<Integer> listFinales= new ArrayList<>();
		listFinal.forEach((p)-> {
			if(listFinales.indexOf(p)==-1) {
				listFinales.add(p);
			}
		});
		
		list1.forEach((p)-> {
			if(listFinales.contains(p)) {
				listFinales.remove(p);
			}
		});
		
		
		int idEmpresa=  empresaEntity.getIdEmpresa();
		
		for (int i = 0; i < list1.size(); i++) {
			
			if (!list2.contains(list1.get(i))) {
				List<Producto> producto = categoriaRepository.consultarProductosConCategorias(list1.get(i), idEmpresa);
				if(producto.isEmpty()) {
					categoriaRepository.eliminar(list1.get(i), idEmpresa);
				}
				else {
					retorno=1;
				}
			}
			
		}

		if(listFinales.size()>0) {
			for (int i = 0; i < listFinales.size(); i++) {
				categoriaRepository.insertarCategorias(listFinales.get(i),empresaEntity.getIdEmpresa());
			}
		}

		return retorno;
	}
}
