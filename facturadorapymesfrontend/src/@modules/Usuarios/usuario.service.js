import axios from 'axios';
const urlConexion = "http://54.146.187.173:8080//facturadoraPymes/application/";

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

async function validarEmailDistinto(email,idUsuario) {
    const url = urlConexion+'user/validarDistintoEmail/'+email+'/'+idUsuario
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

async function editar(user) {
    const url = urlConexion+'user/actualizar'
    let response = null;
    try {      
        response=await axios.put(url,user);
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

async function eliminar(idUser) {
    const url = urlConexion+'user/eliminar/'+idUser
    let response = null;
    try {      
        response=await axios.delete(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};


async function consultaPersonalizada(idEmpresa) {
    const url = urlConexion+'user/consultaPersonalizada/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

export default {validarEmail,registrar,consultarUsuarios,validarEmailDistinto,editar,eliminar,consultaPersonalizada};