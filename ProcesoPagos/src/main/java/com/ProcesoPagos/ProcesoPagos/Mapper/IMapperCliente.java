package com.ProcesoPagos.ProcesoPagos.Mapper;

import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;

public interface IMapperCliente {
	public ClienteModel mostrarClientesSaldoF(Cliente clientes, String valor);
	public ClienteModel mostrarClientes(Cliente clientes);
}
