import express from "express";
const router = express.Router();

import { getUsers, createUser, login, getUsersById, updateUserById, deleteUserById } from '../controllers/userController.js';

//definir rutas
router.get('/', getUsers );
router.post('/', createUser );
router.post('/login', login);
router.get('/:id', getUsersById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

export default router;