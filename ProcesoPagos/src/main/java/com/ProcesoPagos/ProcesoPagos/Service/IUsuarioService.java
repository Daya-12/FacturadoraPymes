package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.List;

import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;
import com.ProcesoPagos.ProcesoPagos.Model.UsuarioModel;

public interface IUsuarioService {
	UsuarioModel validarUsuario(UsuarioModel usuario);
	MensajeModel crearUsuario(UsuarioModel usuario);
	List<UsuarioModel> mostrarUsuarios();
	MensajeModel dardeBajaUsuario(Integer idUser);
	MensajeModel actualizarUser(UsuarioModel usuario);
	
}
