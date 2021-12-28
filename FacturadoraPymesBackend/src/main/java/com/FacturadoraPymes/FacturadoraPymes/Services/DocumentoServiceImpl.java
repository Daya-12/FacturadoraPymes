package com.FacturadoraPymes.FacturadoraPymes.Services;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FacturadoraPymes.FacturadoraPymes.Entities.Documento;
import com.FacturadoraPymes.FacturadoraPymes.IMappers.IMapperDocumento;
import com.FacturadoraPymes.FacturadoraPymes.IServices.IDocumentoService;
import com.FacturadoraPymes.FacturadoraPymes.Models.DocumentoModel;
import com.FacturadoraPymes.FacturadoraPymes.Repositories.IDocumentoRepository;

@Service
public class DocumentoServiceImpl implements IDocumentoService{
	private final IDocumentoRepository documentoRepository;
	private final IMapperDocumento mapperDocumento;
	
	@Autowired
	public DocumentoServiceImpl(IDocumentoRepository documentoRepository, IMapperDocumento mapperDocumento) {
		this.documentoRepository = documentoRepository;
		this.mapperDocumento = mapperDocumento;
	}
	@Override
	public List<DocumentoModel> mostrarDocumentos() {
		List<DocumentoModel> documentos = new LinkedList<>();
		Iterable<Documento> documentoEntities = documentoRepository.findAll();
		documentos = StreamSupport.stream(documentoEntities.spliterator(), false).map((documento) -> {
			return mapperDocumento.mostrarDocumentos(documento);
		}).collect(Collectors.toList());
		return documentos;
	}

}
