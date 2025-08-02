import { body } from "express-validator";

export const validarInscripcion = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("primerApellido").notEmpty().withMessage("El primer apellido es obligatorio"),
  body("curp")
    .matches(/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/)
    .withMessage("CURP inválida"),
  body("correo")
    .isEmail()
    .withMessage("Correo inválido"),
  body("telefono")
    .matches(/^\d{10}$/)
    .withMessage("El teléfono debe tener 10 dígitos"),
  // Puedes agregar más validaciones aquí...
];
