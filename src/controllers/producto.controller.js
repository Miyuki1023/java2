import Producto from "../models/producto.model.js";

// Obtener todos los productos
export const getTodosProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate("user");
    res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Obtener un producto por ID
export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { title, description, categoria, tipo, precio } = req.body;

    const nuevoProducto = new Producto({
      title,
      description,
      categoria,
      tipo,
      precio,
    });

    await nuevoProducto.save();
    res.json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado)
      return res.status(404).json({ message: "Producto no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  try {
    const { title, description, categoria, tipo, precio } = req.body;

    const productoEditado = await Producto.findByIdAndUpdate(
      req.params.id,
      { title, description, categoria, tipo, precio },
      { new: true }
    );

    if (!productoEditado)
      return res.status(404).json({ message: "Producto no encontrado" });

    return res.json(productoEditado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
