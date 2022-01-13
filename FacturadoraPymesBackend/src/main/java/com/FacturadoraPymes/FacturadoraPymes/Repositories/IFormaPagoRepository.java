package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Formapago;

@Repository
public interface IFormaPagoRepository extends CrudRepository<Formapago, Integer>{

}
