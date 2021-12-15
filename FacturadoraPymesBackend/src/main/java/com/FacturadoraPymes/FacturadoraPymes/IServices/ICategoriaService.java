package com.FacturadoraPymes.FacturadoraPymes.IServices;

import java.util.List;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;

public interface ICategoriaService {
	List<CategoriaModel> mostrarCategorias();
	List<CategoriaModel> mostrarCategoriasPorEmpresa(int idEmpresa);
}
