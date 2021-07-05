package com.FacturadoraPymes.FacturadoraPymes.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;


@Repository
public interface IProductoRepository extends CrudRepository<Producto, Integer> {

}
