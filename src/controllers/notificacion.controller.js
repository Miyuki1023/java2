import Notificacion from "../models/notificacion.model.js";

// Obtener todas las notificaciones
export const getTodasNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find();
    res.json(notificaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener una notificación por ID
export const getNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.findById(req.params.id);
    if (!notificacion) return res.status(404).json({ message: "Notificación no encontrada" });
    return res.json(notificacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear una nueva notificación
export const createNotificacion = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // Validación de campos obligatorios
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const nuevaNotificacion = new Notificacion({
      title,
      description,
      startDate,
      endDate,
    });

    await nuevaNotificacion.save();
    res.json(nuevaNotificacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una notificación
export const deleteNotificacion = async (req, res) => {
  try {
    const notificacionEliminada = await Notificacion.findByIdAndDelete(req.params.id);

    if (!notificacionEliminada)
      return res.status(404).json({ message: "Notificación no encontrada" });

    return res.sendStatus(204); // Respuesta sin contenido para la eliminación exitosa
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una notificación
export const updateNotificacion = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // Validación de campos obligatorios
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const notificacionEditada = await Notificacion.findByIdAndUpdate(
      req.params.id,
      { title, description, startDate, endDate },
      { new: true }
    );

    if (!notificacionEditada)
      return res.status(404).json({ message: "Notificación no encontrada" });

    return res.json(notificacionEditada);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};