import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import citaRoutes from "./routes/cita.routes.js";
import graphicRoutes from './routes/graphic.routes.js'
import notificacionRoutes from './routes/notificacion.routes.js';
import clientRoutes from './routes/cliente.routers.js'
import facturaRoutes from './routes/factura.routes.js';
const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoutes);
app.use("/api", productoRoutes);
app.use("/api", citaRoutes);
app.use("/api", graphicRoutes);
app.use('/api', notificacionRoutes);
app.use("/api", clientRoutes);
app.use("/api", facturaRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
