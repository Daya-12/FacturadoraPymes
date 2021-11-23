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

export default {validarEmail};