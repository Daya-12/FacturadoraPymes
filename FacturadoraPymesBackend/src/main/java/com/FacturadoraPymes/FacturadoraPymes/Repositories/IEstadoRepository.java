package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Estado;

@Repository
public interface IEstadoRepository extends CrudRepository<Estado, Integer>{
	@Query(value = "SELECT estado FROM Estado estado WHERE estado.nombreEstado=:nombreEstado and estado.activoEstado=:activo", nativeQuery = false)
	public Optional<Estado> consultarId(@Param("nombreEstado") String nombreEstado,@Param("activo") boolean activo);

}
