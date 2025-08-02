import inscripcion from "../models/inscripcion.js";

// Guardar inscripción
export const crearInscripcion = async (req, res) => {
  try {
    console.log("📥 Datos recibidos:", req.body); // ✅ Para depurar

    const nueva = new inscripcion(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: "Inscripción guardada correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar:", error); // ✅ Para depurar
    res.status(400).json({ error: "Error al guardar" });
  }
};


// Listar inscripciones
export const obtenerInscripciones = async (req, res) => {
  try {
    const inscripciones = await inscripcion.find();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inscripciones" });
  }
};

// Eliminar inscripción (futuro panel admin)
export const eliminarInscripcion = async (req, res) => {
  try {
    await inscripcion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Inscripción eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar" });
  }
};

// Actualizar inscripción (futuro panel admin)
export const actualizarInscripcion = async (req, res) => {
  try {
    await inscripcion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensaje: "Inscripción actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar" });
  }
};
