package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ProcesoPagos.ProcesoPagos.Entity.Cliente;

@Repository
public interface IClienteRepository extends CrudRepository<Cliente, Integer> {

	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.numDocumento = :numDocumento", nativeQuery = false)
	public Optional<Cliente> validarNumDoc(@Param("numDocumento") String numDocumento);

	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.emailCli = :emailCli", nativeQuery = false)
	public Optional<Cliente> validarEmail(@Param("emailCli") String emailCli);
	
	@Query(value = "SELECT DISTINCT cliente FROM Cliente cliente WHERE cliente.emailCli = :emailCli AND cliente.idCliente != :idCliente", nativeQuery = false)
	public Optional<Cliente> validarCorreosDistintos(@Param("emailCli") String emailCli,
			@Param("idCliente") int idCliente);

}
