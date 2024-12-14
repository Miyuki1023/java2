import Cita from '../models/cita.model.js';
import Producto from '../models/producto.model.js';

export const createCita = async (req, res) => {
  try {
    const { nombre, fecha, celular, hora, estado, diseño } = req.body;

    // Verificar que el producto (diseño) existe
    const producto = await Producto.findById(diseño);
    if (!producto) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    const cita = new Cita({
      nombre,
      celular,
      fecha,
      hora,
      estado,
      diseño,
    });

    await cita.save();
    res.status(201).json(cita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error al crear la cita" });
  }
};

export const getCitas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Consulta con paginación y populando 'diseño'
    const citas = await Cita.find()
      .populate('diseño', 'title description precio') // Asegurarse de que 'diseño' hace referencia a 'Producto'
      .skip(skip)
      .limit(parseInt(limit));

    // Contar el total de citas
    const totalCitas = await Cita.countDocuments();

    res.status(200).json({
      data: citas,
      total: totalCitas,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCitas / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas", error });
  }
};

export const getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate('diseño', 'title description precio') // Asegurarse de que 'diseño' hace referencia a 'Producto'
      .populate('email', 'nombre email');
    
    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la cita", error });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.status(200).json({ message: "Cita eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cita", error });
  }
};

export const updateCita = async (req, res) => {
  try {
    const { nombre, email, celular, fecha, hora, estado, diseño } = req.body;

    // Verificar que el producto (diseño) existe
    const producto = await Producto.findById(diseño);
    if (!producto) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    const citaActualizada = await Cita.findByIdAndUpdate(
      req.params.id,
      { nombre, email, celular, fecha, hora, estado, diseño },
      { new: true }
    );

    if (!citaActualizada) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.status(200).json(citaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al editar la cita", error });
  }
};
