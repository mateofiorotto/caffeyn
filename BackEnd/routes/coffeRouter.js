import express from "express";
const router = express.Router();
import { validarToken, esAdmin } from "../middleware/auth.js";

//importar el controlador, desestructurizando
import { getCoffees, getCoffeeById, createCoffee, updateCoffee, deleteCoffee } from "../controllers/coffeeController.js";

//definir rutas
router.get("/", getCoffees);
router.get("/:id", getCoffeeById);
router.post("/", validarToken, esAdmin, createCoffee);
router.put("/:id", validarToken, esAdmin, updateCoffee);
router.delete("/:id", validarToken, esAdmin, deleteCoffee);

export default router;