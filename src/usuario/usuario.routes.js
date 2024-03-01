import { Router } from "express";
import { check } from "express-validator";
import {
  getUsuario,
  getUsuarioById,
  registrarUsuario,
  usuarioUpdate
} from "./usuario.controller.js";
import {
    existenteEmail,
    existeUsuarioById
} from '../helpers/db-validator.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get("/", getUsuario);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], getUsuarioById);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
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