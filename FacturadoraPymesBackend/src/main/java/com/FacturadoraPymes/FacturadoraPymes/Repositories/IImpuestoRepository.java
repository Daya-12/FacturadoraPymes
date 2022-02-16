package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Impuesto;

@Repository
public interface IImpuestoRepository extends CrudRepository<Impuesto, Integer>{
	@Query(value = "SELECT impuesto FROM Impuesto impuesto WHERE impuesto.activoImpuesto=:activo", nativeQuery = false)
	public Iterable<Impuesto> consultarImpuestosActivos(@Param("activo") boolean activo);
}
