package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;

@Repository
public interface IEmpresaRepository extends CrudRepository<Empresa, Integer>{
	@Query(value = "SELECT empresa FROM Empresa empresa WHERE empresa.razonSocial = :razonSocial", nativeQuery = false)
	public Optional<Empresa> validarRazonSocial(@Param("razonSocial") String razonSocial);
	
	@Query(value = "SELECT empresa FROM Empresa empresa WHERE empresa.nitE = :nitE", nativeQuery = false)
	public Optional<Empresa> validarIdentificacion(@Param("nitE") String nitE);
	
	@Query(value = "SELECT empresa FROM Empresa empresa WHERE empresa.correoElectronico = :correoElectronico", nativeQuery = false)
	public Optional<Empresa> validarEmail(@Param("correoElectronico") String correoElectronico);
	
	@Query(value = "SELECT empresa FROM Empresa empresa WHERE empresa.abreviacion=:abreviacion and empresa.activoE=:activo", nativeQuery = false)
	public Optional<Empresa> validarAbreviacion(@Param("abreviacion") String abreviacion,@Param("activo") boolean activo);
}
