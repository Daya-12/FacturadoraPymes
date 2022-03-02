package com.FacturadoraPymes.FacturadoraPymes.Models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EmpresaCategoriasActualizarModel {
	private int id;
	private List<CategoriaModel> categorias;

}
