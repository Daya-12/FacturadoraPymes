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

async function consultarProductos(idEmpresa) {
    const url = urlConexion+'producto/consultar/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function editar(producto) {
    const url = urlConexion+'producto/actualizar'
    let response = null;
    try {      
        response=await axios.put(url,producto);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function validarNombreDistinto(nombre,idProducto,idEmpresa) {
    const url = urlConexion+'producto/validarDistintoNombre/'+nombre+'/'+idProducto+'/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function eliminar(idProducto) {
    const url = urlConexion+'producto/eliminar/'+idProducto
    let response = null;
    try {      
        response=await axios.delete(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};

async function consultaPersonalizada(idEmpresa) {
    const url = urlConexion+'producto/consultaPersonalizada/'+idEmpresa
    let response = null;
    try {      
        response=await axios.get(url);
    } catch (e) {
        console.error(e);
    }
    return response;
};
export default {consultarCategorias,validarNombre,registrar,consultarProductos,editar,validarNombreDistinto,eliminar,consultaPersonalizada};