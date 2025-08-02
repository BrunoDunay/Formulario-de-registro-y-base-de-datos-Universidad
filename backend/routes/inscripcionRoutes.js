import express from "express";
import {
  crearInscripcion,
  obtenerInscripciones,
  eliminarInscripcion,
  actualizarInscripcion
} from "../controllers/inscripcionController.js";

const router = express.Router();

router.post("/", crearInscripcion);
router.get("/", obtenerInscripciones);
router.delete("/:id", eliminarInscripcion);
router.put("/:id", actualizarInscripcion);

export default router;
