import { Router } from "express";
import {
  createCita,
  getCitas,
  getCitaById,
  deleteCita,
  updateCita,
} from "../controllers/cita.controller.js";
import { auth } from "../middlewares/auth.middleware.js";  // Middleware de autenticación
import { validateSchema } from "../middlewares/validator.middleware.js";
import { citaSchema } from "../schemas/cita.schema.js";

const router = Router();

router.get("/citas", getCitas);

router.post(
  "/citas",
  validateSchema(citaSchema), 
  createCita
);

// Ruta para obtener una cita por su ID
router.get("/citas/:id", auth, getCitaById);

// Ruta para editar una cita por su ID
router.put(
  "/citas/:id",
  auth,
  validateSchema(citaSchema),
  updateCita
);

router.delete("/citas/:id", auth, deleteCita);

export default router;
