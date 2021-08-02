package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Usuario;

@Repository
public interface IUsuarioRepository extends CrudRepository<Usuario, Integer>{
	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser AND usuario.passUser = :passUser", nativeQuery = false)
	public Optional<Usuario> validarSesion(@Param("correoUser") String correoUser, @Param("passUser") String passUser);
	
	@Query(value = "SELECT usuario FROM Usuario usuario WHERE usuario.correoUser = :correoUser", nativeQuery = false)
	public Optional<Usuario> validarCorreo(@Param("correoUser") String correoUser);
}
