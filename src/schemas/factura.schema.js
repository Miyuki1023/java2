import { z } from "zod";
// Esquema Zod para Factura
export const facturaSchema = z.object({
  dni: z
    .string()
    .length(8, "El DNI debe tener 8 caracteres")
    .regex(/^\d+$/, "El DNI debe contener solo números"),
  ruc: z
    .string()
    .length(11, "El RUC debe tener 11 caracteres")
    .regex(/^\d+$/, "El RUC debe contener solo números")
    .optional(),
  email: z.string().email("Debe ser un email válido"),
  metodoPago: z
    .string()
    .optional()
    .refine(
      (value) =>
        ["yape", "plin", "transferencia", "efectivo", "tarjeta"].includes(value),
      {
        message: "Método de pago inválido",
      }
    ),
  nombre: z.string().nonempty("El nombre es requerido"),
  productos: z.array(z.string().nonempty("El ID del producto es requerido")),
  precioTotal: z.number().nonnegative("El precio total no puede ser negativo"),
});

