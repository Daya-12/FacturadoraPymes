package com.FacturadoraPymes.FacturadoraPymes.Services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Documento;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCliente;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IClienteService;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IClienteRepository;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Constantes;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Service
public class ClienteServiceImpl implements IClienteService{
	private final IClienteRepository clienteRepository;
	private final IMapperCliente mapperCliente;
	private final Validaciones validaciones;
	
	@Autowired
	public ClienteServiceImpl(IClienteRepository clienteRepository, IMapperCliente mapperCliente,
			Validaciones validaciones) {
		this.clienteRepository = clienteRepository;
		this.mapperCliente = mapperCliente;
		this.validaciones = validaciones;
	}
	@Override
	public MensajeModel crear(ClienteModel cliente) {
		MensajeModel mensajeModel = new MensajeModel();
		Cliente clienteEntity = new Cliente();
		boolean validarIdentificacion = validaciones.validarIdentificacionCliente(clienteRepository, cliente.getNumDocumento(), cliente.getDocumento().getId());
		
		if (!validarIdentificacion) {
			Empresa empresa=new Empresa();
			empresa.setIdEmpresa(cliente.getEmpresa().getId());
			
			Documento documento=new Documento();
			documento.setIdTdocumento(cliente.getDocumento().getId());
			
			Ciudad ciudad=new Ciudad();
			ciudad.setIdCiudad(cliente.getCiudad().getId());
			
			clienteEntity.setIdCliente(cliente.getId());
			clienteEntity.setEmpresa(empresa);
			clienteEntity.setNombreCli(cliente.getNombre());
			clienteEntity.setDocumento(documento);
			clienteEntity.setNumDocumento(cliente.getNumDocumento());
			clienteEntity.setDireccionCli(cliente.getDireccion());
			clienteEntity.setCodpostalCli(cliente.getCodPostal());
			clienteEntity.setCiudad(ciudad);
			clienteEntity.setTelefonoCli(cliente.getTelefono());
			clienteEntity.setActivo(true);
			clienteRepository.save(clienteEntity);
			mensajeModel.setMensaje(Constantes.MENSAJE_REGISTRAR);
			return mensajeModel;
		} else
			throw new NoSuchElementException("El usuario no se pudo registrar");
		
	}

}
