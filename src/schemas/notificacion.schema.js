import { z } from "zod";

export const notificacionSchema = z.object({
  title: z.string({
    required_error: "El título es obligatorio",
  }).min(2, { message: "El título debe tener al menos 2 caracteres" }),

  description: z.string({
    required_error: "La descripción es obligatoria",
  }).max(100, { message: "La descripción no puede exceder los 100 caracteres" }),

  startDate: z.string({
    required_error: "La fecha de inicio es obligatoria",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio debe ser una fecha válida",
  }),

  endDate: z.string({
    required_error: "La fecha de fin es obligatoria",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de fin debe ser una fecha válida",
  }),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return endDate >= startDate;
}, {
  message: "La fecha de fin debe ser posterior o igual a la fecha de inicio",
});