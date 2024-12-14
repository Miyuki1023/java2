import Factura from '../models/factura.model.js';
import Producto from '../models/producto.model.js';

// Crear factura
export const createFactura = async (req, res) => {
  try {
    const { dni, ruc, email, metodoPago, nombre, productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: 'La lista de productos no puede estar vacía' });
    }

    // Verificar existencia de productos
    const productoDocs = await Producto.find({ _id: { $in: productos } });
    if (productoDocs.length !== productos.length) {
      const productosNoEncontrados = productos.filter(
        (id) => !productoDocs.some((producto) => producto._id.toString() === id)
      );
      return res.status(404).json({
        message: 'Uno o más productos no existen',
        productosNoEncontrados,
      });
    }

    // Calcular precio total
    const precioTotal = productoDocs.reduce((total, producto) => total + producto.precio, 0);

    // Crear factura
    const factura = new Factura({
      dni,
      ruc,
      email,
      metodoPago,
      nombre,
      productos,
      precioTotal,
    });

    await factura.save();
    res.status(201).json({ message: 'Factura creada exitosamente', factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la factura', error: error.message });
  }
};

// Obtener todas las facturas
export const getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find().populate('productos');
    res.status(200).json(facturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
  }
};

// Obtener una factura por ID
export const getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id).populate('productos');
  
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
  
    res.status(200).json(factura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
  }
};

// Eliminar una factura
export const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaEliminada = await Factura.findByIdAndDelete(id);
  
    if (!facturaEliminada) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
  
    res.status(200).json({ message: 'Factura eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la factura', error: error.message });
  }
};

// Actualizar una factura
export const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni, ruc, email, metodoPago, nombre, productos } = req.body;
  
    // Verificar si la factura existe
    const existingFactura = await Factura.findById(id);
    if (!existingFactura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
  
    // Verificar existencia de productos si se proporciona una nueva lista
    if (productos && productos.length > 0) {
      const productoDocs = await Producto.find({ _id: { $in: productos } });
      if (productoDocs.length !== productos.length) {
        const productosNoEncontrados = productos.filter(
          (id) => !productoDocs.some((producto) => producto._id.toString() === id)
        );
        return res.status(404).json({ message: 'Uno o más productos no existen', productosNoEncontrados });
      }
  
      existingFactura.precioTotal = productoDocs.reduce((total, producto) => total + producto.precio, 0);
    }
  
    // Actualizar los campos de la factura
    if (dni) existingFactura.dni = dni;
    if (ruc) existingFactura.ruc = ruc;
    if (email) existingFactura.email = email;
    if (metodoPago) existingFactura.metodoPago = metodoPago;
    if (nombre) existingFactura.nombre = nombre;
    if (productos) existingFactura.productos = productos;
  
    // Guardar los cambios
    const updatedFactura = await existingFactura.save();
  
    res.status(200).json({ message: 'Factura actualizada exitosamente', factura: updatedFactura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la factura', error: error.message });
  }
};
