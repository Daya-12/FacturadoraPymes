package com.ProcesoPagos.ProcesoPagos.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperCliente;
import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperProducto;
import com.ProcesoPagos.ProcesoPagos.Mapper.IMapperUsuario;
import com.ProcesoPagos.ProcesoPagos.Mapper.MapperCliente;
import com.ProcesoPagos.ProcesoPagos.Mapper.MapperProducto;
import com.ProcesoPagos.ProcesoPagos.Mapper.MapperUsuario;
import com.ProcesoPagos.ProcesoPagos.Util.Validaciones;

@Configuration
public class ProcesoPagosApplicationConfiguration {

	@Bean
	public IMapperCliente getMapperCliente() {
		return new MapperCliente();
	}

	@Bean
	public IMapperUsuario getMapperUsuario() {
		return new MapperUsuario();
	}

	@Bean
	public IMapperProducto getMapperProducto() {
		return new MapperProducto();
	}

	@Bean
	public Validaciones getValidaciones() {
		return new Validaciones();
	}

}
