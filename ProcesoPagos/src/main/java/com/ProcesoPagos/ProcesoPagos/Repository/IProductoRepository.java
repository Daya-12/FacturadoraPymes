package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;
import com.ProcesoPagos.ProcesoPagos.Entity.Producto;

@Repository
public interface IProductoRepository extends CrudRepository<Producto, Integer> {
	@Query(value = "SELECT count(*) FROM Cliente cliente join cliente.productos p WHERE p.idProducto=:idProducto", nativeQuery = false)
	public String consultarCantidad(@Param("idProducto") int idProducto);

	@Query(value = "SELECT cliente FROM Cliente cliente join cliente.productos p WHERE p.idProducto=:idProducto", nativeQuery = false)
	public List<Cliente> consultarRelacion(@Param("idProducto") int idProducto);

	@Query(value = "SELECT DISTINCT producto FROM Producto producto WHERE producto.nombreProducto = :nombreProducto AND producto.idProducto != :idProducto", nativeQuery = false)
	public Optional<Producto> validarDescripcionP(@Param("nombreProducto") String nombreProducto,
			@Param("idProducto") int idProducto);
	
	@Transactional //try to add this annotation 
	@Modifying
	@Query(value = "DELETE FROM prodclient where id_cliente=:idCliente and id_producto=:idProducto", nativeQuery = true)
	public void eliminarProducto(@Param("idCliente") int idCliente,@Param("idProducto") int idProducto);
	
}
