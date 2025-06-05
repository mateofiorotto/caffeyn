import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname (porque usamos ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta hacia FrontEnd/public/imgs
const frontendImgsPath = path.join(__dirname, "../../FrontEnd/public/imgs");

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, frontendImgsPath); // guarda en FrontEnd/public/imgs
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
