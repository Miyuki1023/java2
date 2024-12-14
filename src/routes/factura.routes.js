import express from 'express';
import { 
    createFactura, 
    getFacturas, 
    getFacturaById, 
  updateFactura, 
  deleteFactura 
} from '../controllers/factura.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { facturaSchema } from "../schemas/factura.schema.js";

const router = express.Router();

router.post('/facturas',validateSchema(facturaSchema), createFactura);
router.get('/facturas', getFacturas);
router.get('/facturas/:id', getFacturaById);
router.put('/facturas/:id',validateSchema(facturaSchema), updateFactura);
router.delete('/facturas/:id', deleteFactura);

export default router;
