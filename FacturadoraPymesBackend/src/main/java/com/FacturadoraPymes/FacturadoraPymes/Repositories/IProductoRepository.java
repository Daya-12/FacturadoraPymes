package com.FacturadoraPymes.FacturadoraPymes.Repositories;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;

@Repository
public interface IProductoRepository extends CrudRepository<Producto, Integer> {
	
	@Query(value = "SELECT producto FROM Producto producto WHERE producto.nombreProducto =:nombre and producto.empresa.idEmpresa=:idEmpresa and producto.activoProducto=:activo", nativeQuery = false)
	public Optional<Producto> validarNombreProducto(@Param("nombre") String nombre,@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "select producto.id_producto,producto.nombre_producto,producto.valor_producto,producto.id_categoria,categoria.nombre_categoria,producto.id_empresa,producto.activo FROM Producto producto INNER JOIN Categoria categoria ON producto.id_categoria= categoria.id_categoria INNER JOIN Empresa empresa ON empresa.id_empresa=producto.id_empresa WHERE producto.id_empresa=:idEmpresa and producto.activo=:activo group by(producto.id_producto) ORDER BY producto.nombre_producto ASC", nativeQuery = true)
	public List<Producto> consultarProductos(@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "SELECT DISTINCT producto FROM Producto producto WHERE producto.nombreProducto = :nombre AND producto.idProducto !=:idProducto AND producto.empresa.idEmpresa=:idEmpresa and producto.activoProducto=:activo", nativeQuery = false)
	public Optional<Producto> validarNombreDistintos(@Param("nombre") String nombre,
			@Param("idProducto") int idProducto,@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "SELECT detalle.producto FROM Detalle detalle INNER JOIN Producto producto ON producto.idProducto = detalle.producto.idProducto WHERE detalle.producto.idProducto=:idProducto", nativeQuery = false)
	public List<Producto> detallesProducto(@Param("idProducto") int idProducto);
}
