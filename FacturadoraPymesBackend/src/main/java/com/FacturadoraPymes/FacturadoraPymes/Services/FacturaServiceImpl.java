package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFacturaService;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class FacturaServiceImpl implements IFacturaService{

	private final IFacturaRepository facturaRepository;
	private final IMapperFactura mapperFactura;
	private final IEmpresaRepository empresaRepository;
	private final Validaciones validaciones;
	
	@Autowired
	public FacturaServiceImpl(IFacturaRepository facturaRepository, IMapperFactura mapperFactura,IEmpresaRepository empresaRepository,Validaciones validaciones) {
		this.facturaRepository = facturaRepository;
		this.mapperFactura = mapperFactura;
		this.empresaRepository=empresaRepository;
		this.validaciones = validaciones;
	}
	
	@Override
	public String obtenerReferencia(int idEmpresa) {
		int numeroAleatorio=(int)(Math.random()*99999)+1000; 
		Optional<Empresa> empresa = empresaRepository.findById(idEmpresa);
		String referenciaFactura=empresa.get().getAbreviacion()+"-"+numeroAleatorio;
		boolean validacion=validaciones.validarReferenciaFactura(facturaRepository, referenciaFactura);
		
		while (validacion) {
			numeroAleatorio=(int)(Math.random()*99999)+1000; 
			referenciaFactura=empresa.get().getAbreviacion()+"-"+numeroAleatorio;
			validacion=validaciones.validarReferenciaFactura(facturaRepository, referenciaFactura);
		}

		return referenciaFactura;
	}

}
