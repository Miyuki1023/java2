import { Router } from "express";
import { getClientesConCitas } from "../controllers/clientes.controller.js";

const router = Router();

router.get("/clientes", getClientesConCitas);

export default router;
