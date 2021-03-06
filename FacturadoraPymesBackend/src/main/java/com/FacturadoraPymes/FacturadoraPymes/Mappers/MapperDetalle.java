package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Detalle;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Producto;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperDetalle;
import com.FacturadoraPymes.FacturadoraPymes.Models.DetallesRecibirModel;

public class MapperDetalle implements IMapperDetalle{

	@Override
	public Detalle recibirDetalles(DetallesRecibirModel detalleModel) {
		Detalle detalle = new Detalle();
		Producto productoEntity = new Producto();
		productoEntity.setIdProducto(detalleModel.getIdProducto());
		detalle.setProducto(productoEntity);
		detalle.setCantidad(detalleModel.getCantidad());
		detalle.setValorUnitario(detalleModel.getValorUnitario());
		detalle.setValorTotal(detalleModel.getValorTotal());
		return detalle;
		
	}

	@Override
	public DetallesRecibirModel entregarDetalles(Detalle detalle) {
		DetallesRecibirModel detalleM = new DetallesRecibirModel();
		detalleM.setIdProducto(detalle.getProducto().getIdProducto());
		detalleM.setNombreProducto(detalle.getProducto().getNombreProducto());
		detalleM.setCantidad(detalle.getCantidad());
		detalleM.setValorUnitario(detalle.getValorUnitario());
		detalleM.setValorTotal(detalle.getValorTotal());
		return detalleM;
	}

}
