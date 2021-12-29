package com.FacturadoraPymes.FacturadoraPymes.IServices;

import com.FacturadoraPymes.FacturadoraPymes.Models.ClienteModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

public interface IClienteService {
	MensajeModel crear(ClienteModel cliente);
}
