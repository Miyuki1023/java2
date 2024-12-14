import { Router } from "express";
import {
  createProducto,
  getProducto,
  deleteProducto,
  updateProducto,
  getTodosProductos,
} from "../controllers/producto.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productoSchema } from "../schemas/producto.schema.js";

const router = Router();

router.get("/productos", getTodosProductos);

router.post(
  "/productos",
  validateSchema(productoSchema), 
  createProducto
);

router.get("/productos/:id", getProducto);

router.put(
  "/productos/:id",
  updateProducto
);

router.delete("/productos/:id", deleteProducto);

export default router;
