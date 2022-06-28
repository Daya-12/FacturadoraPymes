package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;

@Repository
public interface IClienteRepository extends CrudRepository<Cliente, Integer> {
	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.numDocumento=:numIdentificacion and cliente.documento.idTdocumento=:idTipo and cliente.empresa.idEmpresa=:idEmpresa and cliente.activoCli=:activo", nativeQuery = false)
	public Optional<Cliente> validarIdentificacion(@Param("numIdentificacion") String numIdentificacion, @Param("idTipo") int idTipo, @Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "SELECT cliente FROM Cliente cliente WHERE cliente.nombreCli=:nombre and cliente.empresa.idEmpresa=:idEmpresa and cliente.activoCli=:activo", nativeQuery = false)
	public Optional<Cliente> validarNombre(@Param("nombre") String nombre, @Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "select cliente.id_cliente,cliente.nombre_cli,cliente.id_tdocumento,documento.nombre_tdocumento,cliente.num_documento,cliente.direccion_cli,cliente.id_ciudad,ciudad.nombre_ciudad,cliente.id_empresa,cliente.codpostal_cli,cliente.telefono_cli,cliente.activo FROM cliente INNER JOIN documento ON cliente.id_tdocumento= documento.id_tdocumento INNER JOIN ciudad ON cliente.id_ciudad=ciudad.id_ciudad INNER JOIN empresa ON empresa.id_empresa=cliente.id_empresa WHERE cliente.id_empresa=:idEmpresa and cliente.activo=:activo group by(cliente.id_cliente) ORDER BY cliente.nombre_cli ASC", nativeQuery = true)
	public List<Cliente> consultarClientes(@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "SELECT factura FROM Factura factura INNER JOIN Cliente cliente ON cliente.idCliente = factura.cliente.idCliente WHERE cliente.idCliente=:idCliente", nativeQuery = false)
	public List<Factura> facturasCreadasCliente(@Param("idCliente") int idCliente);
}
