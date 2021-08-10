import axios from 'axios';
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const urlConexion = "http://localhost:8080/its/v1/api/"

async function devolverUsuario(object) {
    const url = urlConexion + 'user/validar'
    let response = null;
    try {      
        response=await axios.post(url, object);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarCliente(objectC) {
    const url = urlConexion + 'cliente/validar'
    let response = null;
    try {      
        response=await axios.post(url,objectC);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrar(object,complementUrl) {
    const url = urlConexion + complementUrl
    let response = null;
    try {      
        response=await axios.post(url,object);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultar(complementUrl) {
    const url = urlConexion + complementUrl 
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function dardeBaja(complementUrl) {
    const url = urlConexion +complementUrl
    let response = null;
    try {      
        response=await axios.delete(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function actualizar(complementUrl,object) {
    const url = urlConexion +complementUrl
    let response = null;
    try {      
        response=await axios.put(url,object);
    } catch (e) {
        console.error(e);
    }
    return response;
};


export default {devolverUsuario,validarCliente,registrar,consultar,dardeBaja,actualizar};
