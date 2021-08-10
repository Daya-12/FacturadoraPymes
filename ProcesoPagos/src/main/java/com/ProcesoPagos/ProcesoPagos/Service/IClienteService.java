package com.ProcesoPagos.ProcesoPagos.Service;

import java.util.List;
import com.ProcesoPagos.ProcesoPagos.Model.ClienteModel;
import com.ProcesoPagos.ProcesoPagos.Model.MensajeModel;

public interface IClienteService {
	MensajeModel crearCliente(ClienteModel cliente);
	MensajeModel validarCliente(ClienteModel cliente);
	List<ClienteModel> mostrarClientes();
	List<ClienteModel> mostrarClientesSaldoF();
	MensajeModel actualizarCliente(ClienteModel cliente);
	String eliminarCliente(Integer idCliente);	
}
