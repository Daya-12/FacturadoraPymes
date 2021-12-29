package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;

@Repository
public interface IClienteRepository extends CrudRepository<Cliente, Integer> {
	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.numDocumento=:numIdentificacion and cliente.documento.idTdocumento=:idTipo and cliente.empresa.idEmpresa=:idEmpresa", nativeQuery = false)
	public Optional<Cliente> validarIdentificacion(@Param("numIdentificacion") String numIdentificacion, @Param("idTipo") int idTipo, @Param("idEmpresa") int idEmpresa);
	
	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.nombreCli=:nombre and cliente.empresa.idEmpresa=:idEmpresa", nativeQuery = false)
	public Optional<Cliente> validarNombre(@Param("nombre") String nombre, @Param("idEmpresa") int idEmpresa);
}
