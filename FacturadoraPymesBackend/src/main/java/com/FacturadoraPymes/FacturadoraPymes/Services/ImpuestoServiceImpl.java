package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Impuesto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperImpuesto;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IImpuestoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ImpuestoModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IImpuestoRepository;

@Service
public class ImpuestoServiceImpl implements IImpuestoService{
	private final IImpuestoRepository impuestoRepository;
	private final IMapperImpuesto mapperImpuesto;
	
	@Autowired
	public ImpuestoServiceImpl(IImpuestoRepository impuestoRepository, IMapperImpuesto mapperImpuesto) {
		this.impuestoRepository = impuestoRepository;
		this.mapperImpuesto = mapperImpuesto;
	}

	@Override
	public List<ImpuestoModel> mostrarImpuestos() {
		List<ImpuestoModel> impuestos = new LinkedList<>();
		Iterable<Impuesto> impuestosEntities = impuestoRepository.consultarImpuestosActivos(true);
		impuestos = StreamSupport.stream(impuestosEntities.spliterator(), false).map((impuesto) -> {
			return mapperImpuesto.mostrarImpuestos(impuesto);
		}).collect(Collectors.toList());
		return impuestos;
	}
}
