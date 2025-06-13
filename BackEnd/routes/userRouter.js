import express from "express";
const router = express.Router();

import { getUsers, createUser, login, register, getUsersById, updateUserById, deleteUserById, getUserProfile } from '../controllers/userController.js';
import { validarToken, esAdmin } from "../middleware/auth.js";

//definir rutas
router.get('/profile', validarToken, getUserProfile);
router.get('/', getUsers );
router.get('/:id', getUsersById);
router.post('/', validarToken, esAdmin, createUser );
router.post('/login', login);
router.post('/register', register);
router.delete('/:id', validarToken, esAdmin, deleteUserById);
router.put('/:id', validarToken, esAdmin, updateUserById);

export default router;