package com.ProcesoPagos.ProcesoPagos.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProcesoPagos.ProcesoPagos.Entity.Recibo;

@Repository
public interface IReciboRepository extends CrudRepository<Recibo, Integer> {
	/*
	 * @Query(value =
	 * "select sum(f.totalFact) FROM Recibo r INNER JOIN Factura f ON r.idFactura=:f.idFactura WHERE r.idCliente=:idCliente"
	 * , nativeQuery = false) public double consultarValor(@Param("idCliente") int
	 * idCliente);
	 */

	@Query(value = "select sum(f.total_fact) FROM Recibo r INNER JOIN Factura f ON r.id_factura=f.id_factura WHERE r.id_cliente=:idCliente", nativeQuery = true)
	public String consultarValor(@Param("idCliente") int idCliente);

}
