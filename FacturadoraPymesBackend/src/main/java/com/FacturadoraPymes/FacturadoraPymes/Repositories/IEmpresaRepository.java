package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Empresa;

@Repository
public interface IEmpresaRepository extends CrudRepository<Empresa, Integer>{

}
