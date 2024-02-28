import { Router } from "express";
import { check } from "express-validator";
import {
  registrarUsuario,
  usuarioUpdate
} from "./usuario.controller.js";
import {
  existenteEmail,
  existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    validarCampos,
  ], registrarUsuario);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], usuarioUpdate);

export default router;