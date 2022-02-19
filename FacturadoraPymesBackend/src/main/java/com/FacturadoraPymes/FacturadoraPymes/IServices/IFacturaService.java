package com.FacturadoraPymes.FacturadoraPymes.IServices;
import com.FacturadoraPymes.FacturadoraPymes.Models.FacturaRegistroModel;
import com.FacturadoraPymes.FacturadoraPymes.Models.MensajeModel;

public interface IFacturaService {
	String obtenerReferencia(int idEmpresa);
	MensajeModel registrar(FacturaRegistroModel factura);

}
