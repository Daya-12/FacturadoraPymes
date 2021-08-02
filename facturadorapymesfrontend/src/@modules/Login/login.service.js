import axios from 'axios';
const urlConexion = "http://localhost:8080//facturadoraPymes/application/";

async function validarUsuario(object) {
    const url = urlConexion+'user/validar'
    let response = null;
    try {      
        response=await axios.post(url, object);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {validarUsuario};