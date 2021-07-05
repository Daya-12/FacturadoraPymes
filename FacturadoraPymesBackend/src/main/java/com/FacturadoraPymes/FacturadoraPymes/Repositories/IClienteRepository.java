package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Cliente;

@Repository
public interface IClienteRepository extends CrudRepository<Cliente, Integer> {

}
