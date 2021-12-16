package com.FacturadoraPymes.FacturadoraPymes.Repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;

@Repository
public interface IProductoRepository extends CrudRepository<Producto, Integer> {
	
	@Query(value = "SELECT producto FROM Producto producto WHERE producto.nombreProducto =:nombre and producto.empresa.idEmpresa=:idEmpresa", nativeQuery = false)
	public Optional<Producto> validarNombreProducto(@Param("nombre") String nombre,@Param("idEmpresa") int idEmpresa);
}
