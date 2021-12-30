package com.FacturadoraPymes.FacturadoraPymes.Utils;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ProductoModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

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
	
	public Producto validarActualizacionProducto(Producto productoEntity, Categoria categoria,ProductoModel productoModel) {
		if (!(productoModel.getNombre().equals(productoEntity.getNombreProducto()))) {
			productoEntity.setNombreProducto(productoModel.getNombre());
		}
		if (productoModel.getValor() != productoEntity.getValorProducto()) {
			productoEntity.setValorProducto(productoModel.getValor());
		}
		if (productoModel.getCategoria().getId() != productoEntity.getCategoria().getIdCategoria()) {
			productoEntity.setCategoria(categoria);
		}
		return productoEntity;
	}
	
	public Cliente validarActualizacionCliente(Cliente clienteEntity,ClienteModel clienteModel, Ciudad ciudadEntity) {
		if (!(clienteModel.getDireccion().equals(clienteEntity.getDireccionCli()))) {
			clienteEntity.setDireccionCli(clienteModel.getDireccion());
		}
		if (clienteModel.getCiudad().getId() != clienteEntity.getCiudad().getIdCiudad()) {
			clienteEntity.setCiudad(ciudadEntity);
		}
		if (!(clienteModel.getCodPostal().equals(clienteEntity.getCodpostalCli()))) {
			clienteEntity.setCodpostalCli(clienteModel.getCodPostal());
		}
		if (!(clienteModel.getTelefono().equals(clienteEntity.getTelefonoCli()))) {
			clienteEntity.setTelefonoCli(clienteModel.getTelefono());
		}
		return clienteEntity;
	}
	
}
