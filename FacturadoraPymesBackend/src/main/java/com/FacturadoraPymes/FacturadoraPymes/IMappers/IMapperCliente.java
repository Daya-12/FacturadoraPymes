package com.FacturadoraPymes.FacturadoraPymes.IMappers;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelConsultaP;
import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModelPersonalizado;

public interface IMapperCliente {
	public ClienteModelPersonalizado mostrarClientes (Cliente cliente);
	public ClienteModelConsultaP mostrarClientesPersonalizado (Cliente cliente, String cantidad);
}
