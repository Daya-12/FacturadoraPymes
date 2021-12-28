package com.FacturadoraPymes.FacturadoraPymes.Mappers;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Documento;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperDocumento;
import com.FacturadoraPymes.FacturadoraPymes.Models.DocumentoModel;

public class MapperDocumento implements IMapperDocumento{

	@Override
	public DocumentoModel mostrarDocumentos(Documento documento) {
		DocumentoModel documentoM=new DocumentoModel();
		documentoM.setId(documento.getIdTdocumento());
		documentoM.setNombre(documento.getNombreTdocumento());
		documentoM.setActivo(documento.getActivoTdocumento());
		return documentoM;
	}

}
