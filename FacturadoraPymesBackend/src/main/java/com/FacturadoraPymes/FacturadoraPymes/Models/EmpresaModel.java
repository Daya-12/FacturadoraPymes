package com.FacturadoraPymes.FacturadoraPymes.Models;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EmpresaModel {
	private int id;
	private String razonSocial;
	private String slogan;
	private String nit;
	private String urlLogo;
	private String correoElectronico;
	private String direccion;
	private CiudadModel ciudad;
	private String telefono;
	private boolean activo;
	private List<CategoriaModel> categorias;
	private UsuarioModel usuario;
}
