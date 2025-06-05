import express from "express";
const router = express.Router();
import { validarToken, esAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

//importar el controlador, desestructurizando
import { getCoffees, getCoffeeById, createCoffee, updateCoffee, deleteCoffee } from "../controllers/coffeeController.js";

//definir rutas
router.get("/", getCoffees);
router.get("/:id", getCoffeeById);
router.post("/", upload.single("image"), validarToken, esAdmin, createCoffee);
router.put("/:id", upload.single('image'),validarToken, esAdmin, updateCoffee);
router.delete("/:id", validarToken, esAdmin, deleteCoffee);

export default router;