import axios from 'axios';
const urlConexion = "http://54.172.169.155:8080//facturadoraPymes/application/";

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

async function validarEmail(email) {
    const url = urlConexion+'empresa/validarEmailEmpresa/'+email
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrarPymeLogo(logo) {
    const url = urlConexion+'empresa/registrarLogo'
    let response = null;
    try {      
        response=await axios.post(url,logo);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrarPyme(pyme) {
    const url = urlConexion+'empresa/registrar'
    let response = null;
    try {      
        response=await axios.post(url,pyme);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarCiudades,validarEmail,validarRazonSocial,validarIdentificacion,registrarPymeLogo,registrarPyme};