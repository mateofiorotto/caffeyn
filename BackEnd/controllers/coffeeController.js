import Coffee from "../models/Coffee.js";
import Origin from "../models/Origin.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al folder de imágenes en FrontEnd
const imgDir = path.join(__dirname, "../../FrontEnd/public/imgs");

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
  console.log("📩 req.body:", req.body);
console.log("📦 req.file:", req.file);

  const {
    name,
    description,
    shortDescription,
    roastLevel,
    flavorNote,
    origin,
    price,
  } = req.body;

  const image = req.file?.filename;

  if (
    !name ||
    !description ||
    !shortDescription ||
    !roastLevel ||
    !flavorNote ||
    !image ||
    !origin ||
    !price
  ) {
    return res.status(400).json({
      message: "Faltan datos OBLIGATORIOS",
      data: {
        name,
        description,
        shortDescription,
        roastLevel,
        flavorNote,
        image,
        origin,
        price,
      },
    });
  }

  const originExists = await Origin.findById(origin);
  if (!originExists) {
    return res.status(400).json({ message: "Origen no válido" });
  }

  try {
    const newCoffee = new Coffee({
      name,
      description,
      shortDescription,
      roastLevel,
      flavorNote,
      image,
      origin,
      price,
    });
    console.log("📄 Documento a guardar:", newCoffee);
    await newCoffee.save();
    return res.status(201).json({ message: "Cafe creado", data: newCoffee });
  } catch (error) {
    console.error("Error details:", error);
    return res
      .status(500)
      .json({ msg: "Ocurrió un error", error: error.message });
  }
};

// PUT (update)
export const updateCoffee = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    shortDescription,
    roastLevel,
    flavorNote,
    origin,
    price,
  } = req.body;

  const newImage = req.file?.filename;

  try {
    const existingCoffee = await Coffee.findById(id);
    if (!existingCoffee) {
      return res.status(404).json({ message: "Cafe no encontrado" });
    }

    // Si hay nueva imagen, borrar la anterior
    if (newImage && existingCoffee.image) {
      const oldImagePath = path.join(imgDir, existingCoffee.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("🧹 Imagen anterior eliminada:", existingCoffee.image);
      }
    }

    const updatedCoffee = await Coffee.findByIdAndUpdate(
      id,
      {
        name,
        description,
        shortDescription,
        roastLevel,
        flavorNote,
        image: newImage || existingCoffee.image,
        origin,
        price,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Cafe actualizado", data: updatedCoffee });
  } catch (error) {
    console.error("Error details:", error);
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
    }

    // Eliminar imagen física
    if (coffee.image) {
      const imagePath = path.join(imgDir, coffee.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🧹 Imagen eliminada:", coffee.image);
      }
    }

    return res.status(200).json({ message: "Cafe eliminado", data: coffee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar cafe", error });
  }
};
