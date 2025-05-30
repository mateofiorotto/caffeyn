import mongoose from "mongoose";

//Schema de user: name, created, email, password (sera hasheada en el CONTROLADOR al momento de crearse)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        maxlength: [100, "El nombre no debe exceder los 100 caracteres"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
            "El email debe ser válido"
        ]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: "El rol debe ser 'user' o 'admin'"
        },
        default: 'user',
        required: true
    }
});

export default mongoose.model('User', userSchema);