package com.ProcesoPagos.ProcesoPagos.Util;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import com.ProcesoPagos.ProcesoPagos.Entity.Categoriaprod;
import com.ProcesoPagos.ProcesoPagos.Entity.Ciudad;
import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Entity.Usuario;
import com.ProcesoPagos.ProcesoPagos.Mapper.MapperProducto;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;
import com.ProcesoPagos.ProcesoPagos.Repository.IProductoRepository;

public class Actualizaciones {
	public Usuario validarActualizacionUsuario(Usuario usuarioEntity, UsuarioModel usuarioModel) {
		if (!(usuarioModel.getCorreo().equals(usuarioEntity.getCorreoUser()))) {
			usuarioEntity.setCorreoUser(usuarioModel.getCorreo());
		}

		if (!(usuarioModel.getTelefono().equals(usuarioEntity.getTelefonoUser()))) {
			usuarioEntity.setTelefonoUser(usuarioModel.getTelefono());
		}

		if (usuarioModel.getNivel() != usuarioEntity.getNivelUser()) {
			usuarioEntity.setNivelUser(usuarioModel.getNivel());
		}

		return usuarioEntity;
	}

	public Producto validarActualizacionProducto(Producto productoEntity, ProductoModel productoModel,
			Optional<Categoriaprod> categoriaprod) {
		if (!(productoModel.getNombre().equals(productoEntity.getNombreProducto()))) {
			productoEntity.setNombreProducto(productoModel.getNombre());
		}

		if (productoModel.getValor() != productoEntity.getValorProducto()) {
			productoEntity.setValorProducto(productoModel.getValor());
		}

		if (!(productoModel.getCategoria().getNombre()
				.equals(productoEntity.getCategoriaprod().getNombreCategoria()))) {
			productoEntity.setCategoriaprod(categoriaprod.get());
		}
		return productoEntity;
	}

	public Cliente validarActualizacionCliente(Cliente clienteEntity, ClienteModel clienteModel,
			Optional<Ciudad> ciudad, IProductoRepository productoRepository) {

		if (!(clienteModel.getDireccion().equals(clienteEntity.getDireccionCli()))) {
			clienteEntity.setDireccionCli(clienteModel.getDireccion());
		}

		if (!(clienteModel.getCodpostal().equals(clienteEntity.getCodpostalCli()))) {
			clienteEntity.setCodpostalCli(clienteModel.getCodpostal());
		}

		if (!(clienteModel.getCiudad().getNombre().equals(clienteEntity.getCiudad().getNombreCiudad()))) {
			clienteEntity.setCiudad(ciudad.get());
		}

		if (!(clienteModel.getTelefono().equals(clienteEntity.getTelefonoCli()))) {
			clienteEntity.setTelefonoCli(clienteModel.getTelefono());
		}

		if (!(clienteModel.getEmail().equals(clienteEntity.getEmailCli()))) {
			clienteEntity.setEmailCli(clienteModel.getEmail());
		}

		for (int i = 0; i < clienteEntity.getProductos().size(); i++) {
			productoRepository.eliminarProducto(clienteModel.getId(),
					clienteEntity.getProductos().get(i).getIdProducto());
		}

		MapperProducto mapperProducto = new MapperProducto();
		List<Producto> productos = new LinkedList<>();
		for (ProductoModel productoModel : clienteModel.getProductos()) {
			productos.add(mapperProducto.recibirProductos(productoModel));
		}
		clienteEntity.setProductos(productos);
		return clienteEntity;
	}
}
