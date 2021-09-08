package com.FacturadoraPymes.FacturadoraPymes.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperEmpresa;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperUsuario;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperCiudad;
import com.FacturadoraPymes.FacturadoraPymes.Mappers.MapperEmpresa;
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
	public Validaciones getValidaciones() {
		return new Validaciones();
	}
}
