package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;

@Repository
public interface IUsuarioRepository extends CrudRepository<Usuario, Integer>{
	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser AND usuario.passUser = :passUser", nativeQuery = false)
	public Optional<Usuario> validarSesion(@Param("correoUser") String correoUser, @Param("passUser") String passUser);
	
	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser", nativeQuery = false)
	public Optional<Usuario> validarCorreo(@Param("correoUser") String correoUser);
	
	@Query(value = "select usuario.id_usuario,usuario.nombre_user,usuario.correo_user,usuario.pass_user,usuario.telefono_user,usuario.id_empresa,case usuario.nivel_user when '0' then 'Administrador' when '1' then 'Básico' END AS nivel_user,usuario.id_empresa,usuario.activo FROM Usuario usuario INNER JOIN Empresa empresa ON usuario.id_empresa=empresa.id_empresa WHERE usuario.id_empresa=:idEmpresa and usuario.activo=:activo ORDER BY usuario.nombre_user ASC", nativeQuery = true)
	public List<Usuario> consultarUsuarios(@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);
	
	@Query(value = "SELECT DISTINCT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser AND usuario.idUsuario != :idUsuario", nativeQuery = false)
	public Optional<Usuario> validarCorreosDistintos(@Param("correoUser") String correoUser,
			@Param("idUsuario") int idUsuario);
	
	@Query(value = "SELECT factura FROM Factura factura INNER JOIN Usuario usuario ON usuario.idUsuario = factura.usuario.idUsuario WHERE usuario.idUsuario=:idUsuario", nativeQuery = false)
	public List<Factura> facturasCreadasUsuario(@Param("idUsuario") int idUsuario);
	
	@Query(value = "select usuario.id_usuario,usuario.nombre_user,usuario.correo_user,usuario.pass_user,usuario.telefono_user,usuario.id_empresa,\r\n"
			+ "case usuario.nivel_user when '0' then 'Administrador' when '1' then 'Básico' END AS \r\n"
			+ "nivel_user,usuario.id_empresa,usuario.activo from usuario\r\n"
			+ "where usuario.activo=true and usuario.id_empresa=1 group by(usuario.id_usuario) ORDER BY usuario.nombre_user ASC", nativeQuery = true)
	public List<Usuario> consultaPersonalizada(@Param("idEmpresa") int idEmpresa,@Param("activo") boolean activo);

}
