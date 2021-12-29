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
	private String nombre;
	private String direccion;
	private CiudadModel ciudad;
	private EmpresaModel empresa;
	private String codPostal;
	private String telefono;
	private boolean activo;
}
