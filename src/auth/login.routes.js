import { Router } from "express";
import { check } from "express-validator";
import { login } from "./login.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/login',
    [
        check('correo').optional().isEmail(),
        check('nombre').optional().not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);

export default router;
