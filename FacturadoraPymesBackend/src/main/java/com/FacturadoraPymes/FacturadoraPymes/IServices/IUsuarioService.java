package com.FacturadoraPymes.FacturadoraPymes.IServices;

import java.util.List;


import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

public interface IUsuarioService {
	UsuarioModel iniciarSesion(String email,String pass);
	List<UsuarioModel> mostrarUsuarios();
	MensajeModel crearUsuario(UsuarioModel usuario);

}
