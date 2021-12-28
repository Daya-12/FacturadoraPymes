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
export default {consultarCiudades,consultarDocumentos};