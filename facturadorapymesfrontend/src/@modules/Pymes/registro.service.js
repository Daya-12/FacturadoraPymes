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

async function validarRazonSocial(razonSocial) {
    const url = urlConexion+'empresa/validarNombreEmpresa/'+razonSocial
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarIdentificacion(identificacion) {
    const url = urlConexion+'empresa/validarIdentificacionEmpresa/'+identificacion
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrarPyme(logo) {
    const url = urlConexion+'empresa/registrarLogo'
    let response = null;
    try {      
        response=await axios.post(url,logo);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarCiudades,validarRazonSocial,validarIdentificacion,registrarPyme};