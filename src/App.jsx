import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from './components/Sidebar';
import { AuthProvider } from "./context/AuthContext";
import { ProductoProvider } from "./context/ProductoContext";
import { NotificacionProvider } from "./context/NotificacionContext";

import { CitasProvider } from "./context/CitaContext";
import {FacturaProvider} from "./context/FacturaContext"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import Sidebarcliente from './components/Sidebarcliente';
import  AgregarCitas from './pages/AgregarCitas'; // Usamos la exportación nombrada
import VerCita from './pages/vercitas';
import Citas from './pages/VerCitasHost';
import AgregarProducto from './pages/Productos1';
import Producto from './pages/Productos';
import Clientes from './pages/Clientes';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from "./routes";
import Dashboard from "./pages/Panel";
import Notificaciones from "./pages/Notificacion";
import Factura from "./pages/Factura";

function App() {
  return (
    <AuthProvider>
      <ProductoProvider>
        <CitasProvider>
        <NotificacionProvider>
         <FacturaProvider>
          <BrowserRouter>
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/home' element={<Sidebar />} />
              <Route path='/homecliente' element={<Sidebarcliente />} />

              {/* Ruta para AdminPanel si es necesario */}
              <Route path='/admin' element={<Dashboard />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/citas-form' element={<AgregarCitas />} />
                <Route path='/cita' element={<VerCita />} />
                <Route path='/citas' element={<Citas />} />
                <Route path='/productos' element={<AgregarProducto />} />
                <Route path='/productos-ver' element={<Producto />} />
                <Route path='/clientes' element={<Clientes />} />
                <Route path='/notificaciones' element={<Notificaciones />} />
                <Route path='/factura' element={<Factura />} />
              </Route>
            </Routes>
            <Toaster />
            </BrowserRouter>
            </FacturaProvider>
        </NotificacionProvider>
        </CitasProvider>

      </ProductoProvider>
    </AuthProvider>
  );
}


export default App;
