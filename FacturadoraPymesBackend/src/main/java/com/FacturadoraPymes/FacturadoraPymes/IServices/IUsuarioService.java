package com.FacturadoraPymes.FacturadoraPymes.IServices;

import java.util.List;


import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;

public interface IUsuarioService {
	UsuarioModel iniciarSesion(String email,String pass);
	List<UsuarioModel> mostrarUsuarios(int idEmpresa);
	MensajeModel crearUsuario(UsuarioModel usuario);
	boolean validarEmail(String email);
	boolean validarEmailDistinto(String email,int idUsuario);
	MensajeModel actualizar(UsuarioModel usuario);
	MensajeModel eliminar(int idUser);
	List<UsuarioModel> mostrarUsuariosPersonalizado(int idEmpresa);

}
