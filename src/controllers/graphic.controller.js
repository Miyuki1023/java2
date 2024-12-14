import Cita from '../models/cita.model.js';
import User from '../models/user.model.js';
import Producto from '../models/producto.model.js';

// Obtener estadísticas generales de usuarios y citas
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCitas = await Cita.countDocuments();
    
    const now = new Date();
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

    const usersLastMonth = await User.countDocuments({ createdAt: { $lt: lastMonthEnd } });
    const citasLastMonth = await Cita.countDocuments({ createdAt: { $lt: lastMonthEnd } });

    const calculatePercentageChange = (total, previousTotal) => {
      if (previousTotal === 0) {
        return total > 0 ? 100 : 0; // Si hay nuevos registros y antes había 0, es 100% de crecimiento
      }
      return ((total - previousTotal) / previousTotal * 100).toFixed(2);
    };

    res.json({
      totalUsers,
      userChange: calculatePercentageChange(totalUsers, usersLastMonth),
      totalCitas,
      citaChange: calculatePercentageChange(totalCitas, citasLastMonth),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats', error });
  }
};

// Gráfico de crecimiento mensual de usuarios y citas
export const graphicLine = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const citaGrowth = await Cita.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const response = { userGrowth, citaGrowth };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el crecimiento mensual" });
  }
};

// Gráfico de barras para mostrar los tipos de productos más populares
export const graphicBar = async (req, res) => {
  try {
    const topProducts = await Producto.aggregate([
      {
        $group: {
          _id: "$categoria",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos más populares" });
  }
};

// Gráfico de área para mostrar incidencias mensuales (citas)
export const graphicArea = async (req, res) => {
  try {
    const monthlyCitas = await Cita.aggregate([
      {
        $group: {
          _id: { $month: "$fecha" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      count: 0
    }));

    monthlyCitas.forEach(item => {
      const index = item._id - 1;
      months[index].count = item.count;
    });

    res.json(months);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Gráfico de pastel para mostrar la distribución de tipos de diseño
export const graphicPie = async (req, res) => {
  try {
    const designDistribution = await Cita.aggregate([
      {
        $lookup: {
          from: 'productos', // Colección Producto
          localField: 'diseño',
          foreignField: '_id',
          as: 'design'
        }
      },
      {
        $unwind: '$design'
      },
      {
        $group: {
          _id: '$design.tipo',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedData = designDistribution.map(item => ({
      name: item._id,
      value: item.count
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
