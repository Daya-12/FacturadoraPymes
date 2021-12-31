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
	
	@Query(value = "select IFNULL(SUM(d.valor_total), 0) as detalles FROM Producto p INNER JOIN Detalle d ON p.id_producto=d.id_producto INNER JOIN Factura f ON d.id_factura=f.id_factura INNER JOIN Estado e ON f.id_estado=e.id_estado WHERE d.id_producto=:idProducto and e.nombre_estado!='Anulado'", nativeQuery = true)
	public String consultarProductosTotal(@Param("idProducto") int idProducto);
	
	@Query(value = "select IFNULL(SUM(f.total_fact), 0) as facturas FROM Cliente c INNER JOIN Factura f ON c.id_cliente=f.id_cliente INNER JOIN Estado e ON f.id_estado=e.id_estado WHERE c.id_cliente=:idCliente and e.nombre_estado!='Anulado'", nativeQuery = true)
	public String consultarTotalFacturado(@Param("idCliente") int idCliente);

}
