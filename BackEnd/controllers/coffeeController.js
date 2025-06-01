import Coffee from "../models/Coffee.js";
import Origin from "../models/Origin.js";

//Definir metodos http

// GET + Busqueda x nombre
export const getCoffees = async (req, res) => {
  const { name, roastLevel, origin } = req.query;

  // construir el filtro dinámicamente
  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" }; // búsqueda flexible
  }

  if (roastLevel) {
    filter.roastLevel = { $regex: roastLevel, $options: "i" };
  }

  if (origin) {
    const originDocs = await Origin.find({
      country: { $regex: origin, $options: "i" },
    });
    console.log(originDocs);

    if (originDocs.length > 0) {
      // obtenés un array de ObjectIds
      const originIds = originDocs.map((doc) => doc._id);
      filter.origin = { $in: originIds }; // ← esto es clave
    } else {
      return res.status(404).json({ message: "Origen no encontrado" });
    }
  }

  try {
    const coffees = await Coffee.find(filter).populate("origin");

    if (coffees.length === 0) {
      return res.status(200).json({ message: "Lista de cafes vacia" });
    }

    return res.status(200).json({ message: "OK", data: coffees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener cafés", error });
  }
};

// GET pero con id
export const getCoffeeById = async (req, res) => {
  //obtengo el id
  const { id } = req.params;
  try {
    const coffee = await Coffee.findById(id).populate("origin");

    //si no encuentra el id 404
    if (!coffee) {
      return res.status(404).json({ message: "Cafe no encontrado" });
    } else {
      return res.status(200).json({ message: "OK", data: coffee });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener cafe", error });
  }
};

// POST
export const createCoffee = async (req, res) => {
  const { name, description, roastLevel, flavorNote, image, origin } = req.body;
console.log("Datos recibidos en backend:", req.body);
  if (
    !name ||
    !description ||
    !roastLevel ||
    !flavorNote ||
    !image ||
    !origin
  ) {
    return res
      .status(400)
      .json({
        message: "Faltan datos OBLIGATORIOS",
        data: { name, description, roastLevel, flavorNote, image, origin },
      });
  }

  //validar el origen si existe
  if (origin) {
    const originExists = await Origin.findById(origin);
    if (!originExists) {
      return res.status(400).json({ message: "Origen no válido" });
    }
  }

  try {
    const newCoffee = new Coffee({
      name,
      description,
      roastLevel,
      flavorNote,
      image,
      origin,
    });
    await newCoffee.save();
    return res.status(201).json({ message: "Cafe creado", data: newCoffee });
  } catch (error) {
    console.error("Error details:", error); // Agregar detalles del error
    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ msg: "Error de validación", error: error.message });
    }

    return res
      .status(500)
      .json({ msg: "Ocurrió un error", error: error.message });
  }
};

// PUT (update)
export const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const { name, description, roastLevel, flavorNote, image, origin } = req.body;

  //validar que exista origen
  if (origin) {
    const originExists = await Origin.findById(origin);
    if (!originExists) {
      return res.status(400).json({ message: "Origen no válido" });
    }
  }

  try {
    const updatedCoffee = await Coffee.findByIdAndUpdate(
      id,
      { name, description, roastLevel, flavorNote, image, origin },
      { new: true }
    );

    if (!updatedCoffee) {
      return res.status(404).json({ message: "Cafe no encontrado" });
    } else {
      return res
        .status(200)
        .json({ message: "Cafe actualizado", data: updatedCoffee });
    }
  } catch (error) {
    console.error("Error details:", error); // Agregar detalles del error
    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ msg: "Error de validación", error: error.message });
    }

    return res
      .status(500)
      .json({ msg: "Ocurrió un error", error: error.message });
  }
};

// DELETE
export const deleteCoffee = async (req, res) => {
  const { id } = req.params;

  try {
    const coffee = await Coffee.findByIdAndDelete(id);

    if (!coffee) {
      return res.status(404).json({ message: "Cafe no encontrado" });
    } else {
      return res.status(200).json({ message: "Cafe eliminado", data: coffee });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar cafe", error });
  }
};
