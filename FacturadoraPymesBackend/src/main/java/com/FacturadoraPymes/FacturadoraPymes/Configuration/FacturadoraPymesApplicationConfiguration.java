package com.FacturadoraPymes.FacturadoraPymes.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCliente;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperDocumento;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperFormaPago;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperImpuesto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperProducto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCategoria;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCliente;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperDocumento;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperFactura;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperFormaPago;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperImpuesto;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperProducto;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Utils.Validaciones;

@Configuration
public class FacturadoraPymesApplicationConfiguration{
	
	@Bean
	public IMapperUsuario getMapperUsuario() {
		return new MapperUsuario();
	}

	@Bean
	public IMapperEmpresa getMapperEmpresa() {
		return new MapperEmpresa();
	}
	
	@Bean
	public IMapperCiudad getMapperCiudad() {
		return new MapperCiudad();
	}
	
	@Bean
	public IMapperCategoria getMapperCategoria() {
		return new MapperCategoria();
	}
	
	@Bean
	public IMapperProducto getMapperProducto() {
		return new MapperProducto();
	}
	
	@Bean
	public IMapperDocumento getMapperDocumento() {
		return new MapperDocumento();
	}
	
	@Bean
	public IMapperCliente getMapperCliente() {
		return new MapperCliente();
	}
	
	@Bean
	public IMapperFormaPago getMapperFormaPago() {
		return new MapperFormaPago();
	}
	
	@Bean
	public IMapperFactura getMapperFactura() {
		return new MapperFactura();
	}
	
	@Bean
	public IMapperImpuesto getMapperImpuesto() {
		return new MapperImpuesto();
	}
	
	@Bean
	public Validaciones getValidaciones() {
		return new Validaciones();
	}
}
