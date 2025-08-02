import app from "./index.js";
import dbConnection from "./config/database.js";
import dotenv from "dotenv";

// ✅ Cargar variables desde .env
dotenv.config();

const PORT = process.env.PORT || 3000;

await dbConnection();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
