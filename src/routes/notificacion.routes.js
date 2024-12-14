import { Router } from "express"; 
import {
  createNotificacion,
  getNotificacion,
  deleteNotificacion,
  updateNotificacion,
  getTodasNotificaciones,
} from "../controllers/notificacion.controller.js"; // Verifica la ruta del controlador
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator11.middleware.js";
import { notificacionSchema } from "../schemas/notificacion.schema.js";

const router = Router();

// Obtener todas las notificaciones
router.get("/notificaciones", getTodasNotificaciones);

// Crear una nueva notificación
router.post(
  "/notificaciones",
  validateSchema(notificacionSchema), // Validar los datos del cuerpo
  createNotificacion
);

// Obtener una notificación por ID
router.get("/notificaciones/:id", auth, getNotificacion);

// Actualizar una notificación específica por ID
router.put(
  "/notificaciones/:id",
  auth,
  validateSchema(notificacionSchema), // Validar datos actualizados
  updateNotificacion
);

// Eliminar una notificación específica por ID
router.delete("/notificaciones/:id", auth, deleteNotificacion);

export default router;