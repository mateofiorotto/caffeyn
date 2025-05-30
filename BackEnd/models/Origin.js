import mongoose from "mongoose";

//Schema de Origen: country, region, climate, description
const originSchema = new mongoose.Schema({
      country: {
        type: String,
        required: [true, "El país es obligatorio"],
        minlength: [2, "El país debe tener al menos 2 caracteres"],
        maxlength: [100, "El país no debe exceder los 100 caracteres"],
        trim: true
    },
    region: {
        type: String,
        required: [true, "La región es obligatoria"],
        minlength: [2, "La región debe tener al menos 2 caracteres"],
        maxlength: [100, "La región no debe exceder los 100 caracteres"],
        trim: true
    },
    climate: {
        type: String,
        required: [true, "El clima es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        minlength: [10, "La descripción debe tener al menos 10 caracteres"],
        maxlength: [1000, "La descripción no debe exceder los 1000 caracteres"],
        trim: true
    }
});

export default mongoose.model("Origin", originSchema);
