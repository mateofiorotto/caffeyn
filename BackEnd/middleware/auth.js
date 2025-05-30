import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRETKEY;

// middleware que valida el token
export const validarToken = ( req, res, next  ) => {
    const auth = req.headers.authorization;
    
    //verificar si esta el token
    if( !auth) {
        res.status(401).json({msg: 'No tienes autorización para esto (no esta el token)'});
        return;
    }

    //obtener token
    const token = auth.split(' ')[1];
    console.log( {token});
    
    //verificar token y decodificar
    jwt.verify(token, secretKey, ( error, decoded  ) => {
        if( error) {
            return res.status(403).json({ msg: 'El token no es válido'})
        }

        console.log({decoded})
        
        //si se decodifica el token, devolver el userID
        req.user = decoded;
        next();
    })   
}

//verificar si es admin para usar los metodos http, excepto GET
export const esAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Acceso solo para administradores' });
    }
    next();
};