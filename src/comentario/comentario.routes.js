import { Router } from "express";
import { check } from "express-validator";
import { existeComentarioById } from '../helpers/db-validator.js';
import { hacerComentario, editarComentario, eliminarComentario } from './comentario.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/',
    [
        check('nombre', 'Este no es un autor válido').not().isEmpty(),
        check('titulo', 'Este no es un autor válido').not().isEmpty(),
        validarCampos
    ], hacerComentario);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeComentarioById),
        validarCampos,
    ], editarComentario);

router.delete('/:id', [validarCampos], eliminarComentario);

export default router;