package com.FacturadoraPymes.FacturadoraPymes.IServices;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaRegistroModel;

import java.util.List;

import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultaTablaModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaConsultarReferencia;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

public interface IFacturaService {
	String obtenerReferencia(int idEmpresa);
	MensajeModel registrar(FacturaRegistroModel factura);
	List<FacturaConsultaTablaModel> consultaTabla(int idEmpresa);
	MensajeModel anular(FacturaConsultaTablaModel factura);
	FacturaConsultarReferencia consultarPorReferencia(String referencia);

}
