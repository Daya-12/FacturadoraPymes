package com.ProcesoPagos.ProcesoPagos.Mapper;

import java.util.LinkedList;
import java.util.List;

import com.ProcesoPagos.ProcesoPagos.Entity.Ciudad;
import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Entity.Documento;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;
import com.ProcesoPagos.ProcesoPagos.Model.CiudadModel;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.DocumentoModel;
import com.ProcesoPagos.ProcesoPagos.Model.ProductoModel;

public class MapperCliente implements IMapperCliente {

	@Override
	public ClienteModel mostrarClientesSaldoF(Cliente clientes, String valor) {
		ClienteModel cliente = new ClienteModel();

		// Llave foranea documento
		DocumentoModel documento = new DocumentoModel();
		Documento documentoEntity = clientes.getDocumento();
		documento.setId(documentoEntity.getIdTdocumento());
		documento.setNombre(documentoEntity.getNombreTdocumento());

		// Llave foranea ciudad
		CiudadModel ciudad = new CiudadModel();
		Ciudad ciudadEntity = clientes.getCiudad();
		ciudad.setId(ciudadEntity.getIdCiudad());
		ciudad.setNombre(ciudadEntity.getNombreCiudad());

		// Mapear datos de Cliente
		cliente.setId(clientes.getIdCliente());
		cliente.setDocumento(documento);
		cliente.setNumeroDocumento(clientes.getNumDocumento());
		cliente.setNombres(clientes.getNombresCli());
		cliente.setApellidos(clientes.getApellidosCli());
		cliente.setDireccion(clientes.getDireccionCli());
		cliente.setCiudad(ciudad);
		cliente.setCodpostal(clientes.getCodpostalCli());
		cliente.setTelefono(clientes.getTelefonoCli());
		cliente.setEmail(clientes.getEmailCli());
		cliente.setValorfacts(valor);
		return cliente;
	}

	@Override
	public ClienteModel mostrarClientes(Cliente clientes) {
		ClienteModel cliente = new ClienteModel();

		// Llave foranea documento
		DocumentoModel documento = new DocumentoModel();
		Documento documentoEntity = clientes.getDocumento();
		documento.setId(documentoEntity.getIdTdocumento());
		documento.setNombre(documentoEntity.getNombreTdocumento());

		// Llave foranea ciudad
		CiudadModel ciudad = new CiudadModel();
		Ciudad ciudadEntity = clientes.getCiudad();
		ciudad.setId(ciudadEntity.getIdCiudad());
		ciudad.setNombre(ciudadEntity.getNombreCiudad());

		// Mapear datos de Cliente
		cliente.setId(clientes.getIdCliente());
		cliente.setDocumento(documento);
		cliente.setNumeroDocumento(clientes.getNumDocumento());
		cliente.setNombres(clientes.getNombresCli());
		cliente.setApellidos(clientes.getApellidosCli());
		cliente.setDireccion(clientes.getDireccionCli());
		cliente.setCiudad(ciudad);
		cliente.setCodpostal(clientes.getCodpostalCli());
		cliente.setTelefono(clientes.getTelefonoCli());
		cliente.setEmail(clientes.getEmailCli());
		
		List<ProductoModel> listProductos=new LinkedList<>();
		MapperProducto mapperProducto = new MapperProducto();
		
		for (Producto producto : clientes.getProductos()) {
			listProductos.add(mapperProducto.mostrarProductos(producto));
		}
		
		cliente.setProductos(listProductos);
		return cliente;
	}

}
