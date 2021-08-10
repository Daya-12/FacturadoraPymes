import Connection from '../../../Connection/Consume.js';

export const auhtUser = async(correo,pass) =>{   
    const result = await Connection.devolverUsuario({'correo':correo,'pass':pass});
    return result;
}   