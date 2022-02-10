import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function consultarCiudades() {
    const url = urlConexion+'ciudad/consultar'
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
}; 

async function consultarClits(idEmpresa) {
    const url = urlConexion+'cliente/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultarFormasPago() {
    const url = urlConexion+'formaPago/consultar'
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


async function consultarProductos(idEmpresa) {
    const url = urlConexion+'producto/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultarReferencia(idEmpresa) {
    const url = urlConexion+'factura/obtenerReferencia/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};


export default {consultarCiudades,consultarClits,consultarFormasPago,consultarLogo,buscarPorId,consultarProductos,consultarReferencia};