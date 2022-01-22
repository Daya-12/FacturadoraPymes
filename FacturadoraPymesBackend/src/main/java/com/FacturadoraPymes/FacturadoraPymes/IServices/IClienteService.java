package com.FacturadoraPymes.FacturadoraPymes.IServices;

import java.util.List;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;
import com.FacturadoraPymes.FacturadoraPymes.Models.EmpresaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

public interface IClienteService {
	MensajeModel crear(ClienteModel cliente);
	MensajeModel actualizar(ClienteModel cliente);
	boolean validarIdentificacion(String numIdentificacion,int idTipo,int idEmpresa);
	boolean validarNombre(String nombre,int idEmpresa);
	List<ClienteModelPersonalizado> mostrarClientes(int idEmpresa);
	int eliminar(int idCliente);
	List<ClienteModelConsultaP> mostrarClientesPersonalizado(int idEmpresa);
	ClienteModelPersonalizado buscarPorId(int idCliente);
}
