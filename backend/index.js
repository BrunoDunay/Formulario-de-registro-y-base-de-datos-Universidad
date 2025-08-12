// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import inscripcionRoutes from "./routes/inscripcionRoutes.js";

dotenv.config();

const app = express();

// 1) Habilita CORS para tu Angular en localhost:4200
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2) Lee JSON en el body
app.use(express.json());

// 3) Monta tus rutas
//   – POST /api/login
app.use("/api", authRoutes);
//   – GET/POST/PUT/DELETE /api/inscripciones
app.use("/api/inscripciones", inscripcionRoutes);

export default app;
