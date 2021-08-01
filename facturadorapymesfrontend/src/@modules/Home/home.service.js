import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function consultarFactura(refFactura) {
    const url = urlConexion+'facturas/consultarFactura'+refFactura
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarFactura};