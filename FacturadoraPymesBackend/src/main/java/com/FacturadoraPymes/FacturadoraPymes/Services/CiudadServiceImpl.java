package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.IServices.ICiudadService;
import com.FacturadoraPymes.FacturadoraPymes.Models.CiudadModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.ICiudadRepository;


@Service
public class CiudadServiceImpl implements ICiudadService {
	
	private final ICiudadRepository ciudadRepository;
	private final IMapperCiudad mapperCiudad;
	
	@Autowired
	public CiudadServiceImpl(ICiudadRepository ciudadRepository, IMapperCiudad mapperCiudad) {
		this.ciudadRepository = ciudadRepository;
		this.mapperCiudad = mapperCiudad;
	}

	@Override
	public List<CiudadModel> mostrarCiudades() {
		List<CiudadModel> ciudades = new LinkedList<>();
		Iterable<Ciudad> ciudadEntities = ciudadRepository.findAll();
		ciudades = StreamSupport.stream(ciudadEntities.spliterator(), false).map((ciudad) -> {
			return mapperCiudad.mostrarCiudades(ciudad);
		}).collect(Collectors.toList());
		return ciudades;
	}
	
	
}
