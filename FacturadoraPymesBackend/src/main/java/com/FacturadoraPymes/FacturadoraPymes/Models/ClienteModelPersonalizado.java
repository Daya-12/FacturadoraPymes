package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteModelPersonalizado {
	private int id;
	private String nombre;
	private int id_tdocumento;
	private String nombre_tdocumento;
	private String num_documento;
	private String direccion;
	private int id_ciudad;
	private String nombre_ciudad;
	private int id_empresa;
	private String codPostal;
	private String telefono;
	private boolean activo;

}
