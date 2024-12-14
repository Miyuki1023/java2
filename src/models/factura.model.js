import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  dni: { type: String, required: true, length: 8 },
  ruc: { type: String, length: 11 },
  email: { type: String, required: true },
  metodoPago: { type: String },
  nombre: { type: String, required: true },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',  
    required: true,
  }],
  precioTotal: { type: Number, default: 0 }
});

export default mongoose.model('Factura', facturaSchema);
