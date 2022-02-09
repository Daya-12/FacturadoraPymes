package com.FacturadoraPymes.FacturadoraPymes.Services;
import org.springframework.beans.factory.annotation.Autowired;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IFacturaService;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IFacturaRepository;

public class FacturaServiceImpl implements IFacturaService{

	private final IFacturaRepository facturaRepository;
	private final IMapperFactura mapperFactura;
	private final IEmpresaRepository empresaRepository;
	
	@Autowired
	public FacturaServiceImpl(IFacturaRepository facturaRepository, IMapperFactura mapperFactura,IEmpresaRepository empresaRepository) {
		this.facturaRepository = facturaRepository;
		this.mapperFactura = mapperFactura;
		this.empresaRepository=empresaRepository;
	}
	
	@Override
	public String obtenerReferencia(int idEmpresa) {
		int numeroAleatorio=(int) Math.random() * 9999 + 1000;
		return "";
	}

}
