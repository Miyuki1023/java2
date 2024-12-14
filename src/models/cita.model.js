import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{9}$/.test(v); // Valida que el celular tenga exactamente 9 dígitos
        },
        message: (props) => `${props.value} no es un número de celular válido (9 dígitos).`,
      },
    },
    fecha: {
      type: Date,
      required: true,

    },
    hora: {
      type: String,
      required: true,
    },
    diseño: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto', 
      required: true,
    },
    estado: { 
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cita", citaSchema);