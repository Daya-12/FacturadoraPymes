package com.FacturadoraPymes.FacturadoraPymes.Repositories;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;

@Repository
public interface IDetalleRepository extends CrudRepository<Detalle, Integer>{
	@Modifying
	@Query(value = "INSERT INTO Detalle VALUES(:idFactura,:idProducto,:cantidad,:valorUnitario,:valorTotal)", nativeQuery = true)
	@Transactional
	public void insertarDetalles(@Param("idFactura") int idFactura,@Param("idProducto") int idProducto,@Param("cantidad") int cantidad,@Param("valorUnitario") double valorUnitario,@Param("valorTotal") double valorTotal);
}
