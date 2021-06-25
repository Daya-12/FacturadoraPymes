package com.FacturadoraPymes.FacturadoraPymes.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ClienteModel {
	private int id;
	private DocumentoModel documento;
	private String numDocumento;
	private String nombres;
	private String apellidos;
	private String direccion;
	private CiudadModel ciudad;
	private String codPostal;
	private String telefono;
}
