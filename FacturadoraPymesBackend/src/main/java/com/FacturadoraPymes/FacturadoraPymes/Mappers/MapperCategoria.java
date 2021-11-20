package com.FacturadoraPymes.FacturadoraPymes.Mappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;

public class MapperCategoria implements IMapperCategoria{

	@Override
	public CategoriaModel mostrarCategorias(Categoria categoria) {
		CategoriaModel categoriaM=new CategoriaModel();
		categoriaM.setId(categoria.getIdCategoria());
		categoriaM.setNombre(categoria.getNombreCategoria());
		categoriaM.setActivo(categoria.getActivoCategoria());
		return categoriaM;
	}
	
	@Override
	public Categoria recibirCategorias(CategoriaModel categoriaModel) {
		Categoria categoria = new Categoria();
		categoria.setIdCategoria(categoriaModel.getId());
		categoria.setNombreCategoria(categoriaModel.getNombre());
		categoria.setActivoCategoria(categoriaModel.isActivo());
		return categoria;
	}

}
