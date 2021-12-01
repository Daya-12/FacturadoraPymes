package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import java.util.List;
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
	
	@Query(value = "select usuario.id_usuario,usuario.nombre_user,usuario.correo_user,usuario.pass_user,usuario.telefono_user,usuario.id_empresa,case usuario.nivel_user when '0' then 'Administrador' when '1' then 'Básico' END AS nivel_user,usuario.id_empresa,usuario.activo FROM Usuario usuario WHERE usuario.id_empresa=:idEmpresa ORDER BY usuario.nombre_user ASC", nativeQuery = true)
	public List<Usuario> consultarUsuarios(@Param("idEmpresa") int idEmpresa);

}
