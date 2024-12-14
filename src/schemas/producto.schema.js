import { z } from "zod";

export const productoSchema = z.object({
  tipo: z.enum(['Manicure', 'Pedicure', 'Manicure Spa', 'Pedicure Spa'], {
    required_error: "El tipo es obligatorio",
  }),
  title: z.string({
    required_error: "El título es obligatorio",
  }).min(2, { message: "El título debe tener al menos 2 caracteres" }),
  description: z.string({
    required_error: "La descripción es obligatoria",
  }).min(100, { message: "La descripción como minimo es 100 caracteres" }),
  categoria: z.enum(['Navidad', 'Halloween', 'Año Nuevo', 'San Valentín', 'Día de la Madre', 'Bodas', 'Clasicas'], {
    required_error: "La categoría es obligatoria",
  }),
  precio: z.number({
    required_error: "El precio es obligatorio",
  })
  .positive("El precio debe ser un número positivo")
  .max(10000, "El precio no puede exceder 10,000"),    
  date: z.string().datetime().optional(),
});
