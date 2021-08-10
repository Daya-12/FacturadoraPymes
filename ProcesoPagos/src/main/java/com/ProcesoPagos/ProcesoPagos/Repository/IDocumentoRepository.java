package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProcesoPagos.ProcesoPagos.Entity.Documento;

@Repository
public interface IDocumentoRepository extends CrudRepository<Documento, Integer> {

	@Query(value = "SELECT documento FROM Documento documento WHERE documento.nombreTdocumento = :nombreTdocumento", nativeQuery = false)
	public Optional<Documento> validarNombreDocumento(@Param("nombreTdocumento") String nombreTdocumento);
}
