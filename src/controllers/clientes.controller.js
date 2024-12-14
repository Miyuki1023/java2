import Cita from '../models/cita.model.js';
import User from '../models/user.model.js';

export const getClientesConCitas = async (req, res) => {
  try {
    // Obtener todas las citas
    const citas = await Cita.find();

    // Crear una lista de nombres únicos de los usuarios desde las citas
    const nombres = [...new Set(citas.map(cita => cita.nombre))];

    // Buscar usuarios cuyos usernames coincidan con los nombres
    const usuarios = await User.find({ username: { $in: nombres } });

    // Crear un mapa de usuarios para acceder rápidamente al email por nombre
    const userMap = usuarios.reduce((acc, user) => {
      acc[user.username] = user.email;
      return acc;
    }, {});

    // Combinar los datos de las citas con los emails de los usuarios
    const clientesConCitas = citas.map(cita => ({
      nombre: cita.nombre,
      celular: cita.celular,
      email: userMap[cita.nombre] || "Email no encontrado",
    }));

    res.status(200).json(clientesConCitas);
  } catch (error) {
    console.error("Error al obtener los clientes con citas:", error);
    res.status(500).json({ message: "Error al obtener los clientes con citas", error });
  }
};
