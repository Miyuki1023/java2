import { z } from "zod";

export const citaSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio",
  }),
  celular: z.string({
    required_error: "El celular es obligatorio",
  }).min(9, { message: "El celular debe tener al menos  caracteres" }),
 
  fecha: z.string({
    required_error: "La fecha de inicio es obligatoria",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio debe ser una fecha válida",
  }),
  
  diseño: z.string().length(24, "El diseño debe ser un ObjectId válido de MongoDB"),

  hora: z.enum([
    '8:15 a 10:00',
    '10:15 a 12:00',
    '14:15 a 16:00',
    '16:15 a 18:00',
    '18:15 a 20:00',
    '20:15 a 22:00',
  ], {
    required_error: "La hora debe coincidir con un horario de trabajo",
  }),
  estado: z.enum([
    'Pendiente',
    'Cancelada',
    'Confirmada',
  ]),
  
});
