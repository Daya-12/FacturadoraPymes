package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IEmpresaService;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.UsuarioModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IEmpresaRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;


@Service
public class EmpresaServiceImpl implements IEmpresaService{
	
	private final IEmpresaRepository empresaRepository;
	private final IMapperEmpresa mapperEmpresa;
	private final Validaciones validaciones;
	
	@Autowired
	public EmpresaServiceImpl(IEmpresaRepository empresaRepository, IMapperEmpresa mapperEmpresa,
			Validaciones validaciones) {
		this.empresaRepository = empresaRepository;
		this.mapperEmpresa = mapperEmpresa;
		this.validaciones = validaciones;
	}
	
	@Override
	public List<EmpresaModel> mostrarEmpresas() {
		List<EmpresaModel> empresas = new LinkedList<>();
		Iterable<Empresa> empresaEntities = empresaRepository.findAll();
		empresas = StreamSupport.stream(empresaEntities.spliterator(), false).map((empresa) -> {
			return mapperEmpresa.mostrarEmpresas(empresa);
		}).collect(Collectors.toList());
		return empresas;
	}
	
	@Override
	public Optional<Empresa> validarEmpresa(UsuarioModel usuario) {
		Optional<Empresa> empresa = empresaRepository.findById(usuario.getEmpresa().getId());
		if (!empresa.isPresent()) {
			throw new NoSuchElementException(Constantes.EMPRESA_INEXISTENTE);
		}
		return empresa;
	}

}
