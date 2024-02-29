import { request, response } from "express";
import Publicacion from './publicacion.model.js';
import Usuario from '../usuario/usuario.model.js';

export const savePet = async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ correo: data.correo });
    if (!user) return res.status(404).send({ 
        message: 'Propietario no encontrado' 
    });
    const pet = new Pet({
        ...data,
        keeper: user._id,
    });

    await pet.save();
    res.status(200).json({
        pet
    });
}


export const crearPublicacion = async (req, res) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(404).json({ 
            msg: 'Usuario no encontrado' 
        });
    }
    const publicacion = new Publicacion({
        autor: usuario._id
    });
    
    await publicacion.save();
    res.status(200).json({ 
        publicacion 
    });
};

 export const editarPublicacion = async (req = request, res = response) => {
    const { id } = req.params;
    const { texto } = req.body;

    await Publicacion.findByIdAndUpdate(id, { texto });

    const publicacion = await Publicacion.findOne({ _id: id });
    res.status(200).json({
        msg: 'Publicacion Actualizada',
        publicacion,
    });
};

 export const eliminarPublicacion = async (req = request, res = response) => {
    const { id } = req.params;
    await Publicacion.findByIdAndDelete(id);
    res.status(200).json({
        msg: 'Se ha eliminado la publicación exitosamente'
    });
};
