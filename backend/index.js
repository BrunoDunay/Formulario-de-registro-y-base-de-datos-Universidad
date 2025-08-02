import express from "express";
import inscripcionRoutes from "./routes/inscripcionRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/inscripciones", inscripcionRoutes);

export default app;
