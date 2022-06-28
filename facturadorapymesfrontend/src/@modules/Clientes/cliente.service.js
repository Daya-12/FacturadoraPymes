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

async function editar(producto) {
    const url = urlConexion+'cliente/actualizar'
    let response = null;
    try {      
        response=await axios.put(url,producto);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function eliminar(idCliente) {
    const url = urlConexion+'cliente/eliminar/'+idCliente
    let response = null;
    try {      
        response=await axios.delete(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultaPersonalizada(idEmpresa) {
    const url = urlConexion+'cliente/consultaPersonalizada/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarCiudades,consultarDocumentos,registrar,validarDocumento,validarNombre,consultar,editar,eliminar,consultaPersonalizada};