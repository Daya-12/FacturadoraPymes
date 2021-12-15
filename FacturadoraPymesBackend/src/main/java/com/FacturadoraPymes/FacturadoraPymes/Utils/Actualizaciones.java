package com.FacturadoraPymes.FacturadoraPymes.Utils;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;
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
		if (!(productoModel.getCategoria().getNombre()
				.equals(productoEntity.getCategoria().getNombreCategoria()))) {
			productoEntity.setCategoria(categoria);
		}
		return productoEntity;
	}
	
}
