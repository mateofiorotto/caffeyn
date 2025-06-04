import mongoose from "mongoose";

//Schema de Cafe: name, description, roastLevel, flavorNote, image, origin (relacionado con el modelo Origin)
const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        maxlength: [100, "El nombre no debe exceder los 100 caracteres"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        minlength: [10, "La descripción debe tener al menos 10 caracteres"],
        maxlength: [1000, "La descripción no debe exceder los 1000 caracteres"],
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, "La descripción corta es obligatoria"],
        minlength: [10, "La descripción corta debe tener al menos 10 caracteres"],
        maxlength: [100, "La descripción corta no debe exceder los 100 caracteres"],
        trim: true
    },
    roastLevel: {
        type: String,
        required: [true, "El nivel de tostado es obligatorio"]
    },
    flavorNote: {
        type: String,
        required: [true, "La nota de sabor es obligatoria"],
        trim: true,
        maxlength: [100, "La nota de sabor no debe exceder los 100 caracteres"]
    },
    image: {
        type: String,
        required: [true, "La URL/direccion de la imagen es obligatoria"]
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Origin",
        required: [true, "El origen es obligatorio"]
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [0, "El precio no puede ser negativo"],
    }
});

export default mongoose.model("Coffee", coffeeSchema);