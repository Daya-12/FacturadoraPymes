package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;

public interface IMapperCategoria {
	public CategoriaModel mostrarCategorias (Categoria categoria);
	public Categoria recibirCategorias (CategoriaModel categoriaModel);
}
