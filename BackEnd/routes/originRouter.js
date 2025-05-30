import express from "express";
import { validarToken, esAdmin } from "../middleware/auth.js";

const router = express.Router();

//importar el controlador, desestructurizando
import { getOrigins, getOriginById, createOrigin, updateOrigin, deleteOrigin } from "../controllers/originController.js";

//definir rutas
router.get("/", getOrigins);
router.get("/:id", getOriginById);
router.post("/", validarToken, esAdmin, createOrigin);
router.put("/:id", validarToken, esAdmin, updateOrigin);
router.delete("/:id", validarToken, esAdmin, deleteOrigin);

export default router;