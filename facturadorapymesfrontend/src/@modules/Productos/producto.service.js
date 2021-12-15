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

export default {consultarCategorias};