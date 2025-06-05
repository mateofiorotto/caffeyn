import express from "express";
const router = express.Router();

import { getUsers, createUser, login, register, getUsersById, updateUserById, deleteUserById, getUserProfile } from '../controllers/userController.js';

//definir rutas
router.get('/profile', getUserProfile);
router.get('/', getUsers );
router.post('/', createUser );
router.post('/login', login);
router.post('/register', register);
router.get('/:id', getUsersById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

export default router;