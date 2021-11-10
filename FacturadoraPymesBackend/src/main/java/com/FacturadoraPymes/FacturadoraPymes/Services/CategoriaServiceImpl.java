package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.IServices.ICategoriaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.CategoriaModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICategoriaRepository;
@Service
public class CategoriaServiceImpl implements ICategoriaService {
	
	private final ICategoriaRepository categoriaRepository;
	private final IMapperCategoria mapperCategoria;
	
	@Autowired
	public CategoriaServiceImpl(ICategoriaRepository categoriaRepository, IMapperCategoria mapperCategoria) {
		this.categoriaRepository = categoriaRepository;
		this.mapperCategoria = mapperCategoria;
	}
	
	@Override
	public List<CategoriaModel> mostrarCategorias() {
		List<CategoriaModel> categorias = new LinkedList<>();
		Iterable<Categoria> categoriaEntities = categoriaRepository.findAll();
		categorias = StreamSupport.stream(categoriaEntities.spliterator(), false).map((categoria) -> {
			return mapperCategoria.mostrarCategorias(categoria);
		}).collect(Collectors.toList());
		return categorias;
	}
	
}
