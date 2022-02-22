package com.FacturadoraPymes.FacturadoraPymes.IServices;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaRegistroModel;

import java.util.List;

import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

public interface IFacturaService {
	String obtenerReferencia(int idEmpresa);
	MensajeModel registrar(FacturaRegistroModel factura);
	List<FacturaConsultaTablaModel> consultaTabla(int idEmpresa);

}
