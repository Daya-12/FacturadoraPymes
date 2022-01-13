package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Formapago;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFormaPago;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFormaPagoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.FormaPagoModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFormaPagoRepository;
@Service
public class FormaPagoServiceImpl implements IFormaPagoService {
	private final IFormaPagoRepository formaPagoRepository;
	private final IMapperFormaPago mapperFormaPago;
	
	@Autowired
	public FormaPagoServiceImpl(IFormaPagoRepository formaPagoRepository, IMapperFormaPago mapperFormaPago) {
		this.formaPagoRepository = formaPagoRepository;
		this.mapperFormaPago = mapperFormaPago;
	}

	@Override
	public List<FormaPagoModel> mostrarFormasPago() {
		List<FormaPagoModel> formasPago = new LinkedList<>();
		Iterable<Formapago> formasPagoEntities = formaPagoRepository.findAll();
		formasPago = StreamSupport.stream(formasPagoEntities.spliterator(), false).map((formaPago) -> {
			return mapperFormaPago.mostrarFormasPago(formaPago);
		}).collect(Collectors.toList());
		return formasPago;
	}
}
