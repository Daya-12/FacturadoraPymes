package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCliente;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;

public class MapperCliente implements IMapperCliente{

	@Override
	public ClienteModelPersonalizado mostrarClientes(Cliente cliente) {
		ClienteModelPersonalizado clienteM = new ClienteModelPersonalizado();
		clienteM.setId(cliente.getIdCliente());
		clienteM.setNombre(cliente.getNombreCli());
		clienteM.setId_tdocumento(cliente.getDocumento().getIdTdocumento());
		clienteM.setNombre_tdocumento(cliente.getDocumento().getNombreTdocumento());
		clienteM.setNum_documento(cliente.getNumDocumento());
		clienteM.setDireccion(cliente.getDireccionCli());
		clienteM.setId_ciudad(cliente.getCiudad().getIdCiudad());
		clienteM.setNombre_ciudad(cliente.getCiudad().getNombreCiudad());
		clienteM.setId_empresa(cliente.getEmpresa().getIdEmpresa());
		clienteM.setCodPostal(cliente.getCodpostalCli());
		clienteM.setTelefono(cliente.getTelefonoCli());
		clienteM.setActivo(cliente.getActivo());
		return clienteM;
		
	}

}
