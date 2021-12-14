package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UsuarioModelPersonalizado {
	private int id;
	private String nombre;
	private String correo;
	private String telefono;
	private String nivel;
	private int id_empresa;
	private boolean activo;
	private int facturas;
}
