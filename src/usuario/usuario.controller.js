import { response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from './usuario.model.js';

export const getUsuario = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        usuario,
    });
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario,
    });
}

export const registrarUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario,
    });
}

export const usuarioUpdate = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(); 
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await Usuario.findByIdAndUpdate(id, rest);

    const usuario = await Usuario.findOne({ _id: id });
    res.status(200).json({
        msg: 'Usuario Actualizado',
        usuario,
    });
}