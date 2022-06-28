package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;

@Repository
public interface IFacturaRepository extends CrudRepository<Factura, Integer> {
	
	@Query(value = "select count(f.id_usuario) as facturas FROM factura f INNER JOIN estado e ON e.id_estado=f.id_estado INNER JOIN usuario u ON u.id_usuario = f.id_usuario WHERE u.id_usuario=:idUsuario and e.nombre_estado!='Anulado'", nativeQuery = true)
	public String consultarCantidad(@Param("idUsuario") int idUsuario);
	
	@Query(value = "select IFNULL(SUM(d.valor_total), 0) as detalles FROM producto p INNER JOIN detalle d ON p.id_producto=d.id_producto INNER JOIN factura f ON d.id_factura=f.id_factura INNER JOIN estado e ON f.id_estado=e.id_estado WHERE d.id_producto=:idProducto and e.nombre_estado!='Anulado'", nativeQuery = true)
	public String consultarProductosTotal(@Param("idProducto") int idProducto);
	
	@Query(value = "select IFNULL(SUM(f.total_fact), 0) as facturas FROM cliente c INNER JOIN factura f ON c.id_cliente=f.id_cliente INNER JOIN estado e ON f.id_estado=e.id_estado WHERE c.id_cliente=:idCliente and e.nombre_estado!='Anulado'", nativeQuery = true)
	public String consultarTotalFacturado(@Param("idCliente") int idCliente);
	
	@Query(value = "SELECT factura FROM Factura factura WHERE factura.refPago=:referencia", nativeQuery = false)
	public Optional<Factura> validarReferencia(@Param("referencia") String referencia);
	
	@Query(value = "select f.id_factura, f.ref_pago, f.fecha_emision,f.fecha_vencimiento,cdad.id_ciudad, cdad.nombre_ciudad,cli.id_cliente,cli.nombre_cli, f.total_fact, u.id_usuario,u.nombre_user,\r\n"
			+ "e.id_estado,e.nombre_estado,f.formapago_personalizada,f.id_formapago,f.subtotal_factura, f.valor_letras from factura f\r\n"
			+ "inner join ciudad cdad ON f.id_ciudad=cdad.id_ciudad\r\n"
			+ "inner join cliente cli ON f.id_cliente=cli.id_cliente\r\n"
			+ "inner join usuario u ON f.id_usuario=u.id_usuario\r\n"
			+ "inner join estado e ON f.id_estado=e.id_estado\r\n"
			+ "inner join empresa em ON u.id_empresa=em.id_empresa\r\n"
			+ "where em.id_empresa=:idEmpresa group by(f.id_factura) ORDER BY f.ref_pago ASC", nativeQuery = true)
	public List<Factura> consultarFacturaTabla(@Param("idEmpresa") int idEmpresa);


}
