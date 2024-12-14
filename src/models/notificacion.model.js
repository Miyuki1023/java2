import mongoose from 'mongoose';

const notificacionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Campo obligatorio
    },
    description: {
      type: String,
      required: true, // Campo obligatorio
    },
    startDate: {
      type: Date, // Fecha de inicio
      required: true, // Campo obligatorio
    },
    endDate: {
      type: Date, // Fecha de fin
      required: true, // Campo obligatorio
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

export default mongoose.model("Notificacion", notificacionSchema);