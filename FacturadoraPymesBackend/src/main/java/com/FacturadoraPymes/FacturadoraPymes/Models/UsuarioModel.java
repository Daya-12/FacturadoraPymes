package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class UsuarioModel {
	
	private int id;
	private String nombre;
	private String correo;
	private String pass;
	private String telefono;
	private String nivel;
	private EmpresaModel empresa;
	private boolean activo;
	
}
