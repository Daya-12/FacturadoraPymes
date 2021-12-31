package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteModelConsultaP {
	private int id;
	private String nombre;
	private String nombre_tdocumento;
	private String num_documento;
	private String direccion;
	private String nombre_ciudad;
	private int id_empresa;
	private String nombre_empresa;
	private String codPostal;
	private String telefono;
	private boolean activo;
	private double valorFacturado;

}
