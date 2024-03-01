import { Router } from "express";
import { check } from "express-validator";
import {
    existePublicacionById
  } from '../helpers/db-validator.js';
import { crearPublicacion, editarPublicacion, eliminarPublicacion } from './publicacion.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/',
    [
        check('nombre', 'Este no es un autor válido').not().isEmpty(),
        validarCampos
    ], crearPublicacion);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existePublicacionById),
        validarCampos,
    ], editarPublicacion);

router.delete('/:id', [validarCampos], eliminarPublicacion);

export default router;
