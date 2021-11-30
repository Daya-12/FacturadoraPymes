import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function validarEmail(email) {
    const url = urlConexion+'user/validarEmail/'+email
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function registrar(user) {
    const url = urlConexion+'user/registrar'
    let response = null;
    try {      
        response=await axios.post(url,user);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultarUsuarios(idEmpresa) {
    const url = urlConexion+'user/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {validarEmail,registrar,consultarUsuarios};