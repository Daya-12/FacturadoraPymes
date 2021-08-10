package com.ProcesoPagos.ProcesoPagos.Util;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.ProcesoPagos.ProcesoPagos.Entity.Categoriaprod;
import com.ProcesoPagos.ProcesoPagos.Entity.Ciudad;
import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Entity.Documento;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Entity.Usuario;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;
import com.ProcesoPagos.ProcesoPagos.Repository.ICategoriaProdRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.ICiudadRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IClienteRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IDocumentoRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IProductoRepository;
import com.ProcesoPagos.ProcesoPagos.Repository.IUsuarioRepository;

public class Validaciones {

	public boolean validarIdUsuario(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.findById(usuarioModel.getId());
		if (usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_EXISTENTE);
		} else
			return true;
	}

	public boolean validarCorreo(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.validarCorreo(usuarioModel.getCorreo());
		if (usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_EXISTENTE);
		} else
			return true;
	}

	public Optional<Usuario> validarLogin(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioEntity = usuarioRepository.validarUsuario(usuarioModel.getCorreo(),
				String.valueOf(usuarioModel.getPass().hashCode()));
		if (!usuarioEntity.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_INEXISTENTE);
		} else
			return usuarioEntity;
	}

	public boolean validarIdProducto(IProductoRepository productoRepository, ProductoModel productoModel) {
		Optional<Producto> productoValidacion = productoRepository.findById(productoModel.getId());
		if (productoValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.PRODUCTO_EXISTENTE);
		} else
			return true;
	}

	public Optional<Categoriaprod> validarCategoria(ProductoModel producto,
			ICategoriaProdRepository categoriaRepository) {
		Optional<Categoriaprod> categoriaProd = categoriaRepository
				.validarNombreCategoria(producto.getCategoria().getNombre());
		if (!categoriaProd.isPresent()) {
			throw new NoSuchElementException(Constantes.CATEGORIA_INEXISTENTE);
		}
		return categoriaProd;
	}

	public boolean validarIdCliente(IClienteRepository clienteRepository, ClienteModel clienteModel) {
		Optional<Cliente> clienteValidacion = clienteRepository.findById(clienteModel.getId());
		if (clienteValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CLIENTE_EXISTENTE);
		} else
			return true;
	}

	public boolean validarNumDoc(IClienteRepository clienteRepository, ClienteModel cliente) {
		Optional<Cliente> clienteValidacion = clienteRepository.validarNumDoc(cliente.getNumeroDocumento());
		if (clienteValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CLIENTE_EXISTENTE);
		} else
			return true;
	}

	public Optional<Documento> validarDocumento(ClienteModel cliente, IDocumentoRepository documentoRepository) {
		Optional<Documento> documento = documentoRepository.validarNombreDocumento(cliente.getDocumento().getNombre());
		if (!documento.isPresent()) {
			throw new NoSuchElementException(Constantes.TIPODOCUMENTO_INEXISTENTE);
		}
		return documento;
	}

	public Optional<Ciudad> validarCiudad(ClienteModel cliente, ICiudadRepository ciudadRepository) {
		Optional<Ciudad> ciudad = ciudadRepository.validarCiudad(cliente.getCiudad().getNombre());
		if (!ciudad.isPresent()) {
			throw new NoSuchElementException(Constantes.CIUDAD_INEXISTENTE);
		}
		return ciudad;
	}

	public boolean validarCorreoC(IClienteRepository clienteRepository, ClienteModel cliente) {
		Optional<Cliente> clienteValidacion = clienteRepository.validarEmail(cliente.getEmail());
		if (clienteValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CLIENTE_EXISTENTE);
		} else
			return true;
	}

	public boolean validarExistenciaUser(IUsuarioRepository usuarioRepository, Integer idUser) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.findById(idUser);
		if (!usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_INEXISTENTE);
		} else
			return true;
	}

	public boolean validarExistenciaCorreo(IUsuarioRepository usuarioRepository, UsuarioModel usuarioModel) {
		Optional<Usuario> usuarioValidacion = usuarioRepository.validarCorreosDistintos(usuarioModel.getCorreo(),
				usuarioModel.getId());
		if (usuarioValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.USUARIO_EXISTENTE);
		} else {
			return true;
		}
	}

	public boolean validarExistenciaProd(IProductoRepository productoRepository, Integer idProd) {
		Optional<Producto> productoValidacion = productoRepository.findById(idProd);
		if (!productoValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.PRODUCTO_INEXISTENTE);
		} else
			return true;
	}

	public boolean validarRelaciones(IProductoRepository productoRepository, Integer idProd) {
		List<Cliente> listClientes = productoRepository.consultarRelacion(idProd);
		if (listClientes != null && !listClientes.isEmpty()) {
			throw new NoSuchElementException(Constantes.RELACION_PRODUCTOS);
		}
		return true;
	}

	public boolean validarDescripcion(IProductoRepository productoRepository, ProductoModel productoModel) {
		Optional<Producto> productoValidacion = productoRepository.validarDescripcionP(productoModel.getNombre(),
				productoModel.getId());
		if (productoValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.PRODUCTO_EXISTENTE);
		} else {
			return true;
		}
	}

	public boolean validarExistenciaCorreoCliente(IClienteRepository clienteRepository, ClienteModel clienteModel) {
		Optional<Cliente> clienteValidacion = clienteRepository.validarCorreosDistintos(clienteModel.getEmail(),
				clienteModel.getId());
		if (clienteValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CLIENTE_EXISTENTE);
		} else {
			return true;
		}
	}

	public boolean validarExistenciaCliente(IClienteRepository clienteRepository, Integer idCliente) {
		Optional<Cliente> clienteValidacion = clienteRepository.findById(idCliente);
		if (!clienteValidacion.isPresent()) {
			throw new NoSuchElementException(Constantes.CLIENTE_INEXISTENTE);
		} else
			return true;
	}

}
