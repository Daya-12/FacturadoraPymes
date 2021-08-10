package com.ProcesoPagos.ProcesoPagos.Model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ClienteModel {
	
	private int id;
	private DocumentoModel documento;
	private String numeroDocumento;
	private String nombres;
	private String apellidos;
	private String direccion;
	private CiudadModel ciudad;
	private String codpostal;
	private String telefono;
	private String email;
	
	private String valorfacts;
	
	private List<ProductoModel> productos;

	
	
}
