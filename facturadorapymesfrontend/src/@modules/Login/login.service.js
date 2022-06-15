import axios from 'axios';
const urlConexion = "http://54.146.187.173:8080//facturadoraPymes/application/";

async function validarUsuario(object) {
    const url = urlConexion+'user/validar/'+object.correo+'/'+object.pass
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {validarUsuario};