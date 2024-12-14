import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ['Manicure', 'Pedicure', 'Manicure Spa', 'Pedicure Spa'],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
      enum: ['Navidad','Halloween','Año Nuevo','San Valentín','Día de la Madre', 'Bodas','Clasicas'],
    },
    precio: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Producto", productoSchema);
