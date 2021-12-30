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
async function consultarDocumentos() {
    const url = urlConexion+'documento/consultar'
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};
async function registrar(cliente) {
    const url = urlConexion+'cliente/registrar'
    let response = null;
    try {      
        response=await axios.post(url,cliente);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarDocumento(numIdentificacion,idTipo,idEmpresa) {
    const url = urlConexion+'cliente/validarIdentificacion/'+numIdentificacion+'/'+idTipo+'/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarNombre(nombre,idEmpresa) {
    const url = urlConexion+'cliente/validarNombre/'+nombre+'/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultar(idEmpresa) {
    const url = urlConexion+'cliente/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarCiudades,consultarDocumentos,registrar,validarDocumento,validarNombre,consultar};