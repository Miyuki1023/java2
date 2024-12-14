import { createContext, useContext, useState } from 'react';
import {
  createFacturaRequest,
  deleteFacturaRequest,
  getAllFacturasRequest,
  getFacturaRequest,
  updateFacturaRequest,
} from '../api/factura';

const FacturaContext = createContext();

export const useFactura = () => {
  const context = useContext(FacturaContext);
  if (!context) throw new Error('useFactura must be used within a FacturaProvider');
  return context;
};

export const FacturaProvider = ({ children }) => {
  const [facturas, setFacturas] = useState([]);
  const [facturasFiltradas, setFacturasFiltradas] = useState([]);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('');

  // Obtener todas las facturas
  const getAllFacturas = async () => {
    try {
      const res = await getAllFacturasRequest();
      setFacturas(res.data);
    } catch (error) {
      console.error('Error al obtener las facturas', error);
    }
  };

  // Crear una factura
  const createFactura = async (factura) => {
    try {
      const res = await createFacturaRequest(factura);
      const data = res.json();
      console.log(res);
      console.log(data)
      if (res.data) {
        setFacturas((prevFacturas) => [...prevFacturas, res.data]);
      }
    } catch (error) {
      console.error('Error al crear la factura', error);
    }
  };

  // Obtener una factura por ID
  const getFactura = async (id) => {
    try {
      const res = await getFacturaRequest(id);
      return res.data; // Retorna los datos de la factura
    } catch (error) {
      console.error('Error al obtener la factura', error);
    }
  };

  // Actualizar una factura
  const updateFactura = async (id, factura) => {
    try {
      const res = await updateFacturaRequest(id, factura);
      setFacturas((prevFacturas) =>
        prevFacturas.map((fact) => (fact._id === id ? res.data : fact))
      );
    } catch (error) {
      console.error('Error al actualizar la factura', error);
    }
  };

  // Eliminar una factura
  const deleteFactura = async (id) => {
    try {
      const res = await deleteFacturaRequest(id);
      if (res.status === 204) {
        setFacturas((prevFacturas) => prevFacturas.filter((factura) => factura._id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar la factura', error);
    }
  };

  // Filtrar facturas por método de pago
  const filtrarFacturasPorMetodoPago = (metodo) => {
    setMetodoPagoSeleccionado(metodo);
    if (metodo === '') {
      setFacturasFiltradas(facturas); // Mostrar todas las facturas si no hay método seleccionado
    } else {
      const filtradas = facturas.filter((factura) => factura.metodoPago === metodo);
      setFacturasFiltradas(filtradas);
    }
  };

  return (
    <FacturaContext.Provider
      value={{
        facturas,
        getAllFacturas,
        createFactura,
        getFactura,
        updateFactura,
        deleteFactura,
        filtrarFacturasPorMetodoPago,
        facturasFiltradas,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
};
