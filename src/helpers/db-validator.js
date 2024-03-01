import Usuario from '../usuario/usuario.model.js';
import Publicacion from '../publicacion/publicacion.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existePublicacionById = async(id = '') => {
    const existePublicacion = await Publicacion.findById(id);

    if(!existePublicacion){
        throw new Error(`La publicación con el id "${id}" no se encuentra en la base de datos.`);
    }
}