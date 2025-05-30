//Traigo mongoose y dotenv con import
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//conectando a la bd: mando la URI desde el .env y a la constante db le asigno la conexion
mongoose.connect(process.env.URI_BD);
const db = mongoose.connection;

//devolvemos el estado de la conexion
db.on('error', () => console.error("Hubo un error"));
db.once('open', () => {
    console.log("La conexion tuvo exito")
})

export default db;