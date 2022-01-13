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

async function consultarClits(idEmpresa) {
    const url = urlConexion+'cliente/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultarFormasPago() {
    const url = urlConexion+'formaPago/consultar'
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
}; 
export default {consultarCiudades,consultarClits,consultarFormasPago};