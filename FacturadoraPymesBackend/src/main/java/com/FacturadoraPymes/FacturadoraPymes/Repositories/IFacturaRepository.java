package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;

@Repository
public interface IFacturaRepository extends CrudRepository<Factura, Integer> {
	
	@Query(value = "select count(f.id_usuario) as facturas FROM Factura f INNER JOIN Usuario u ON u.id_usuario = f.id_usuario WHERE u.id_usuario=:idUsuario", nativeQuery = true)
	public String consultarCantidad(@Param("idUsuario") int idUsuario);

}
