import { request, response } from "express";
import Comentario from './comentario.model.js';
import Publicacion from '../publicacion/publicacion.model.js';
import Usuario from '../usuario/usuario.model.js';

export const hacerComentario = async (req =  request, res = response) => {
    const { comentario, nombre, titulo } = req.body;
    const usuario = await Usuario.findOne({ nombre });
    const publicacion = await Publicacion.findOne({ titulo });
    if (!usuario) {
        return res.status(404).send({ 
            msg: 'Usuario no encontrado' 
        });
    }
    if (!publicacion) {
        return res.status(404).send({ 
            msg: 'Publicacion no encontrado' 
        });
    }
    const newComentario = new Comentario({
        comentario,
        autor: usuario._id,
        publicacion: publicacion._id
    });

    await newComentario.save();
    res.status(200).json({
        comentario
    });
};

export const editarComentario = async (req = request, res = response) => {
    const { id } = req.params;
    const { comentario } = req.body;
    await Comentario.findByIdAndUpdate(id, { comentario });

    const editComentario = await Comentario.findOne({ _id: id });
    res.status(200).json({
        msg: 'Comentario Actualizada',
        editComentario,
    });
}

export const eliminarComentario = async (req = request, res = response) => {
    const { id } = req.params;
    await Comentario.findByIdAndDelete(id);
    res.status(200).json({
        msg: "Se ha eliminado el comentario"
    });
}
