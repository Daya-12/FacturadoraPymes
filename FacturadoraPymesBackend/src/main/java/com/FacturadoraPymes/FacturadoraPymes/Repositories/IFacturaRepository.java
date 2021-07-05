package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Factura;

@Repository
public interface IFacturaRepository extends CrudRepository<Factura, Integer> {

}
