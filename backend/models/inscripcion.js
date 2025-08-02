import mongoose from "mongoose";

const inscripcionSchema = new mongoose.Schema({
  programa: String,
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  curp: String,
  diaNacimiento: Number,
  mesNacimiento: Number,
  anioNacimiento: Number,
  ciudadNacimiento: String,
  paisNacimiento: String,
  telefono: String,
  correo: String,
  calle: String,
  numero: String,
  cp: String,
  colonia: String,
  municipio: String,
  estado: String,
  telefonoMovil: String,
  whatsapp: String,
  correoContacto: String,
  nombreContacto: String,
  gradoEstudios: String,
  planEstudios: String,
  institucion: String,
  asesor: String
}, { timestamps: true });

const inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

export default inscripcion;
