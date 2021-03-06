package com.FacturadoraPymes.FacturadoraPymes.Utils;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Base64;
import java.security.MessageDigest;
import java.math.BigInteger;
import javax.crypto.Cipher;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.security.NoSuchAlgorithmException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.BadPaddingException;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.InvalidAlgorithmParameterException;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICategoriaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IClienteRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IProductoRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IUsuarioRepository;

public class Validaciones {
	private String keyIni = "sjs68Uas8SDhuy14";
    private String vecIni="FcdGh5412auy12K5";
    
    public String asegurarPass(String pass) {
        try {
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
            sha256.update(pass.getBytes("UTF-8"));
            pass = String.format("%064x", new BigInteger(1, sha256.digest()));
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        }
        return pass;
    }
    
	public String cifrarPassAES (String pass) {
		String passCifrada="";
		Cipher objAES;
		try {
            objAES = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec claveSecreta=new SecretKeySpec(this.keyIni.getBytes("UTF-8"),"AES");
            IvParameterSpec ivP=new IvParameterSpec (this.vecIni.getBytes("UTF-8"));
            objAES.init(Cipher.ENCRYPT_MODE, claveSecreta, ivP);
            byte[] byteCifrado=objAES.doFinal(pass.getBytes("UTF-8"));
            passCifrada=Base64.getEncoder().encodeToString(byteCifrado);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoSuchPaddingException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvalidKeyException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvalidAlgorithmParameterException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalBlockSizeException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (BadPaddingException ex) {
            Logger.getLogger(Validaciones.class.getName()).log(Level.SEVERE, null, ex);
        }

        return passCifrada;
		
	}
	
	public Optional<Usuario> validarSesion(IUsuarioRepository usuarioRepository, String email,String pass) {
		Optional<Usuario> usuarioEntity = usuarioRepository.validarSesion(email,pass,true);
		if (!usuarioEntity.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_INEXISTENTE);
		} else
			return usuarioEntity;
	}
	
	public boolean validarCorreo(IUsuarioRepository usuarioRepository, String email) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.validarCorreo(email,true);
		if (usuarioValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarEmpresa(IEmpresaRepository empresaRepository, String nombreEmpresa) {
		Optional<Empresa> empresaValidacion = empresaRepository.validarRazonSocial(nombreEmpresa);
		if (empresaValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarIdentificacionEmpresa(IEmpresaRepository empresaRepository, String identificacionEmpresa) {
		Optional<Empresa> empresaValidacion = empresaRepository.validarIdentificacion(identificacionEmpresa);
		if (empresaValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarEmailEmpresa(IEmpresaRepository empresaRepository, String emailEmpresa) {
		Optional<Empresa> empresaValidacion = empresaRepository.validarEmail(emailEmpresa);
		if (empresaValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarCorreoDistinto(IUsuarioRepository usuarioRepository, String email,int idUsuario) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.validarCorreosDistintos(email,idUsuario,true);
		if (usuarioValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarExistenciaUser(IUsuarioRepository usuarioRepository, Integer idUser) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.findById(idUser);
		if (!usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_INEXISTENTE);
		} else
			return true;
	}
	
	public boolean validarExistenciaCliente(IClienteRepository clienteRepository, Integer idCliente) {
		Optional<Cliente> clienteValidacion = clienteRepository.findById(idCliente);
		if (clienteValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	
	public boolean validarIdProducto(IProductoRepository productoRepository, int idProducto) {
		Optional<Producto> productoValidacion = productoRepository.findById(idProducto);
		if (productoValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public Optional<Categoria> validarCategoria(ICategoriaRepository categoriaRepository, int idCategoria) {
		Optional<Categoria> categoriaValidacion = categoriaRepository.findById(idCategoria);
		if (!categoriaValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CATEGORIA_INEXISTENTE);
		} else
			return categoriaValidacion;
	}
	
	
	public boolean validarNombreProducto(IProductoRepository productoRepository, String nombre, int idEmpresa) {
		Optional<Producto> productoValidacion = productoRepository.validarNombreProducto(nombre,idEmpresa,true);
		if (productoValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarNombreDistinto(IProductoRepository productoRepository, String nombre, int idProducto, int idEmpresa) {
		Optional<Producto> productoValidacion = productoRepository.validarNombreDistintos(nombre,idProducto,idEmpresa,true);
		if (productoValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarIdentificacionCliente(IClienteRepository clienteRepository, String numIdentificacion, int idTipo, int idEmpresa) {
		Optional<Cliente> clienteValidacion = clienteRepository.validarIdentificacion(numIdentificacion,idTipo,idEmpresa,true);
		if (clienteValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarNombreCliente(IClienteRepository clienteRepository, String nombre, int idEmpresa) {
		Optional<Cliente> clienteValidacion = clienteRepository.validarNombre(nombre,idEmpresa,true);
		if (clienteValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarAbreviacionEmpresa(IEmpresaRepository empresaRepository, String abreviacion) {
		Optional<Empresa> empresaValidacion = empresaRepository.validarAbreviacion(abreviacion,true);
		if (empresaValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
	public boolean validarReferenciaFactura(IFacturaRepository facturaRepository, String referencia) {
		Optional<Factura> empresaValidacion = facturaRepository.validarReferencia(referencia);
		if (empresaValidacion.isPresent()) {
			return true;
		} else
			return false;
	}
	
}
