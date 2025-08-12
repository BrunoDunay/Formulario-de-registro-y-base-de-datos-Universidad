// routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario, password } = req.body;


  if (
    usuario === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign(
      { usuario, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ token, role: "admin" });
  }

  return res.status(401).json({ message: "Credenciales incorrectas" });
});

export default router;
