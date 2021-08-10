package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProcesoPagos.ProcesoPagos.Entity.Categoriaprod;

@Repository
public interface ICategoriaProdRepository extends CrudRepository<Categoriaprod, Integer> {
	@Query(value = "SELECT categoria FROM Categoriaprod categoria WHERE categoria.nombreCategoria = :nombreCategoria", nativeQuery = false)
	public Optional<Categoriaprod> validarNombreCategoria(@Param("nombreCategoria") String nombreCategoria);
}
