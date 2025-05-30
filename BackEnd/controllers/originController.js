import Origin from "../models/Origin.js";

//Definir metodos http

// GET
export const getOrigins = async (req, res) => {
    try {
        const origins = await Origin.find();

        if (origins.length === 0) {
            return res.status(200).json({ message: "Lista de origenes vacia" });
        }

        return res.status(200).json({ message: "OK", data: origins });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener origenes", error });
    }
}

// GET pero por ID
export const getOriginById = async (req, res) => {
    const { id } = req.params;

    try {
        const origin = await Origin.findById(id);

        if (!origin) {
            return res.status(404).json({ message: "Origen no encontrado" });
        } else {
            return res.status(200).json({ message: "OK", data: origin });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener origen", error });
    }
}

// POST
export const createOrigin = async (req, res) => {
    const { country, region, climate, description } = req.body;

    if (!country || !region || !climate || !description) {
        return res.status(400).json({ message: "Faltan datos OBLIGATORIOS", data: { country, region, climate, description } });
    }

    try {
        const newOrigin = new Origin({ country, region, climate, description });
        await newOrigin.save();
        return res.status(201).json({ message: "Origen creado", data: newOrigin });
    } catch (error) {
        console.error("Error details:", error); // Agregar detalles del error
        // Manejo de errores de validación de Mongoose
        if (error.name === "ValidationError") {
            return res.status(400).json({ msg: 'Error de validación', error: error.message });
        }
        
        return res.status(500).json({ msg: 'Ocurrió un error', error: error.message });
    }
}

// PUT (update)
export const updateOrigin = async (req, res) => {
    const { id } = req.params;
    const { country, region, climate, description } = req.body;

    try {
        const updatedOrigin = await Origin.findByIdAndUpdate(id, { country, region, climate, description }, { new: true });

        if (!updatedOrigin) {
            return res.status(404).json({ message: "Origen no encontrado" });
        } else {
            return res.status(200).json({ message: "Origen actualizado", data: updatedOrigin });
        }
    } catch (error) {
        console.error("Error details:", error); // Agregar detalles del error
        // Manejo de errores de validación de Mongoose
        if (error.name === "ValidationError") {
            return res.status(400).json({ msg: 'Error de validación', error: error.message });
        }
        
        return res.status(500).json({ msg: 'Ocurrió un error', error: error.message });
    }
}

// DELETE
export const deleteOrigin = async (req, res) => {
    const { id } = req.params;

    try {
        const origin = await Origin.findByIdAndDelete(id);

        if (!origin) {
            return res.status(404).json({ message: "Origen no encontrado" });
        } else {
            return res.status(200).json({ message: "Origen eliminado", data: origin });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar origen", error });
    }
}