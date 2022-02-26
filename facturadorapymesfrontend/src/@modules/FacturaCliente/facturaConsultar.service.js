import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function consultarPorReferencia(refFactura) {
    const url = urlConexion+'factura/consultarPorReferencia/'+refFactura
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarPorReferencia};