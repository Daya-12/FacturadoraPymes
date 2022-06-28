import axios from 'axios';
const urlConexion = "http://54.172.169.155:8080//facturadoraPymes/application/";

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

async function consultarLogo(idEmpresa) {
    const url = urlConexion+'empresa/consultarLogo/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function buscarPorId(idEmpresa) {
    const url = urlConexion+'empresa/buscarPorId/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};


export default {consultarPorReferencia,consultarLogo,buscarPorId};