
package com.ProcesoPagos.ProcesoPagos.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioModel {
	private int id;
	private String nombre;
	private String correo;
	private String pass;
	private String telefono;
	private int nivel;
}
