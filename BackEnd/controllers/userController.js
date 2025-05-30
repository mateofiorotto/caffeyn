import User from "../models/User.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//secretKey para el jwt
const secretKey = process.env.SECRETKEY;
//Salt para el bcrypt
const salt = 10;

// Metodo POST para crear un usuario
export const createUser = async ( req, res ) => {
    const { name, email, password, role } = req.body;
    
    if( !name || !email || !password || !role ){
        return res.status(400).json({ msg: 'Faltan datos OBLIGATORIOS', data: { name, email, password, role } });
    }

    try {

        //verificar si el mail existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                msg: 'El email ya está registrado',
                data: { email }
            });
        }

        //hashear pw
        const passwordHash = await bcrypt.hash(password, salt);
        //Instanciar modelo y hashear pw
        const newUser = new User({ name, email, password: passwordHash, role })
        await newUser.save();
        return res.status(200).json({ msg: 'Usuario Creado', data: newUser})
    } catch (error) {
        console.error("Error details:", error); // Agregar detalles del error
        // Manejo de errores de validación de Mongoose
        if (error.name === "ValidationError") {
            return res.status(400).json({ msg: 'Error de validación', error: error.message });
        }
        
        return res.status(500).json({ msg: 'Ocurrió un error', error: error.message });
    }

}

// Metodo POST para login
export const login = async ( req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        //verificar si el mail existe
        if( !user){
            return res.status(401).json({ msg: 'El email no existe', data: {} });
        }
        //verificar contraseña correcta, comparando la pw con el hash
        const passwordOk = await bcrypt.compare(  password, user.password );
        if( !passwordOk){
            return res.status(401).json({ msg: 'La contraseña es incorrecta', data: {} });
        }
        //si todo esta OK guardar token
        const data = {
            userId: user._id,
            name: user.name,
            role: user.role
        }
        //creamos el token jwt
        const token = jwt.sign( data, secretKey, { expiresIn: '1h'} );

        console.log(token);
        //enviar el token al cliente en una response
        return res.status(200).json({ msg: 'success', data:{ jwt: token}});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Ocurrio un error', data: {}})
    }
}

// GET usuarios
export const getUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({ msg: 'Ok', data: users });
}

// GET usuarios x id
export const getUsersById = async ( req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if( user ){
            return res.status(200).json({ msg: "success", data: user});
        } else {
            return res.status(404).json({ msg: "No se encontro el usuario", data: { }});

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Ocurrio un error', data: {}})
    }
}

// DELETE user
export const deleteUserById = async ( req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if( user ){
            return res.status(200).json({ msg: "success", data: user});
        } else {
            return res.status(404).json({ msg: "No se encontro el usuario", data: { }});

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Ocurrio un error', data: {}})
    }
}

//UPDATE user
export const updateUserById = async ( req, res) => {
    const { id } = req.params;
    const { name, email, password, role} = req.body;

    const passwordHash = await bcrypt.hash(password, salt);

    try {
        let updateData = { name, email, role };

        //hashear si se actualiza la pw
        if (password) {
            const passwordHash = await bcrypt.hash(password, salt);
            updateData.password = passwordHash;
        }

        const user = await User.findByIdAndUpdate(id, { name, email, password: passwordHash, role}, {new: true});
        if( user ){
            return res.status(200).json({ msg: "success", data: user});
        } else {
            return res.status(404).json({ msg: "No se encontro el usuario", data: { }});

        }
    } catch (error) {
        console.error("Error details:", error); // Agregar detalles del error
        // Manejo de errores de validación de Mongoose
        if (error.name === "ValidationError") {
            return res.status(400).json({ msg: 'Error de validación', error: error.message });
        }
        
        return res.status(500).json({ msg: 'Ocurrió un error', error: error.message });
    }
};