export const validateSchema = (schema) => (req, res, next) => {
    try {
      // Intenta validar el cuerpo de la solicitud con el esquema de Zod
      schema.parse(req.body);
      next(); // Si la validación es exitosa, continúa al siguiente middleware
    } catch (error) {
      // Si ocurre un error en la validación
      console.error("Error de validación:", error);  // Agrega un log del error para la terminal
  
      if (error instanceof Error && error.errors) {
        // Maneja el caso en que hay errores en el arreglo 'errors' de Zod
        return res.status(400).json({
          error: error.errors.map((err) => err.message), // Extrae y muestra los mensajes de error
        });
      }
  
      // Si ocurre un error inesperado
      return res.status(500).json({
        message: "Error inesperado en la validación.",
      });
    }
  };