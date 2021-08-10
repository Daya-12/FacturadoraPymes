package com.ProcesoPagos.ProcesoPagos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ProcesoPagos.ProcesoPagos.Entity.Usuario;

@Repository
public interface IUsuarioRepository extends CrudRepository<Usuario, Integer> {
	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser AND usuario.passUser = :passUser", nativeQuery = false)
	public Optional<Usuario> validarUsuario(@Param("correoUser") String correoUser, @Param("passUser") String passUser);

	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser", nativeQuery = false)
	public Optional<Usuario> validarCorreo(@Param("correoUser") String correoUser);

	@Query(value = "SELECT DISTINCT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser AND usuario.idUsuario != :idUsuario", nativeQuery = false)
	public Optional<Usuario> validarCorreosDistintos(@Param("correoUser") String correoUser,
			@Param("idUsuario") int idUsuario);
}
