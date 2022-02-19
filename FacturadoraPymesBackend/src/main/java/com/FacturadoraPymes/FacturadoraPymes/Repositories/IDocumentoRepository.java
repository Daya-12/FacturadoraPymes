package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Documento;
@Repository
public interface IDocumentoRepository extends CrudRepository<Documento, Integer>{

}
