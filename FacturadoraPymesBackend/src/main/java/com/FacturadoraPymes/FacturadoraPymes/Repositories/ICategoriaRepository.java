package com.FacturadoraPymes.FacturadoraPymes.Repositories;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Categoria;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;

public interface ICategoriaRepository extends CrudRepository<Categoria, Integer>{
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM categoriaempresa WHERE id_categoria=:idCategoria and id_empresa=:idEmpresa", nativeQuery = true)
	public void eliminar(@Param("idCategoria") int idCategoria,@Param("idEmpresa") int idEmpresa);

	@Modifying
	@Query(value = "INSERT INTO categoriaempresa VALUES(:idCategoria,:idEmpresa)", nativeQuery = true)
	@Transactional
	public void insertarCategorias(@Param("idCategoria") int idCategoria,@Param("idEmpresa") int idEmpresa);
	
	@Query(value = "SELECT producto FROM Producto producto INNER JOIN Categoria categoria ON producto.categoria.idCategoria=categoria.idCategoria WHERE categoria.idCategoria=:idCategoria and producto.empresa.idEmpresa=:idEmpresa", nativeQuery = false)
	public List<Producto> consultarProductosConCategorias(@Param("idCategoria") int idCategoria,@Param("idEmpresa") int idEmpresa);
	
	@Query(value = "SELECT categoria.id_categoria,categoria.nombre_categoria,categoria.activo FROM categoria inner join categoriaempresa on categoria.id_categoria=categoriaempresa.id_categoria where categoriaempresa.id_empresa=:idEmpresa", nativeQuery = true)
	public List<Categoria> consultarCategoriasPorEmpresa(@Param("idEmpresa") int idEmpresa);
}
