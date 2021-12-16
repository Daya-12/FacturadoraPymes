import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function consultarCategorias(idEmpresa) {
    const url = urlConexion+'categoria/consultarPorEmpresa/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarNombre(nombre,idEmpresa) {
    const url = urlConexion+'producto/validarNombre/'+nombre+'/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrar(producto) {
    const url = urlConexion+'producto/registrar'
    let response = null;
    try {      
        response=await axios.post(url,producto);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {consultarCategorias,validarNombre,registrar};