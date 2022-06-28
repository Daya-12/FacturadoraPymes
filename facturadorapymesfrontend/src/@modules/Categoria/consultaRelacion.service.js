import axios from 'axios';
const urlConexion = "http://54.172.169.155:8080//facturadoraPymes/application/";

async function consultarCategorias() {
    const url = urlConexion+'categoria/consultar'
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultarCategoriasPersonalizado(idEmpresa) {
    const url = urlConexion+'categoria/consultarPorEmpresa/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function actualizar(empresaCategorias) {
    const url = urlConexion+'empresa/actualizarCategorias'
    let response = null;
    try {      
        response=await axios.put(url,empresaCategorias);
    } catch (e) {
        console.error(e);
    }
    return response;
};
export default {consultarCategorias,consultarCategoriasPersonalizado,actualizar};