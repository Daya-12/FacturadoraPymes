package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProcesoPagos.ProcesoPagos.Entity.Ciudad;

@Repository
public interface ICiudadRepository extends CrudRepository<Ciudad, Integer> {

	@Query(value = "SELECT ciudad FROM Ciudad ciudad WHERE ciudad.nombreCiudad = :nombreCiudad", nativeQuery = false)
	public Optional<Ciudad> validarCiudad(@Param("nombreCiudad") String nombreCiudad);
}
