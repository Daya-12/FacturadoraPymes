package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Ciudad;

@Repository
public interface ICiudadRepository extends CrudRepository<Ciudad, Integer>{

}
