import React, { createContext, useContext, useState } from 'react';
import { createCitaRequest, getCitasRequest, updateCitaRequest, deleteCitaRequest, getCitasClientRequest } from '../api/cita'; // Ajusta las rutas según tu proyecto
import toast from 'react-hot-toast';

// Creamos el contexto
const CitaContext = createContext();

// Hook para usar el contexto de citas
export const useCitas = () => {
  return useContext(CitaContext);
};

// Proveedor de CitaContext
export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);

  // Función para obtener todas las citas
  const getCitas = async () => {
    try {
      const { data } = await getCitasRequest();
      console.log("Citas cargadas:", data); // Depuración
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar las citas:", error);
      toast.error("Error al cargar las citas.");
    }
  };
  

  // Función para crear una cita
  const createCita = async (cita) => {
    try {
      await createCitaRequest(cita);
      toast.success("Cita creada con éxito.");
      getCitas(); // Actualizar la lista de citas
    } catch (error) {
      toast.error("Error al crear la cita.");
    }
  };

  // Función para actualizar una cita
  const updateCita = async (cita) => {
    try {
      await updateCitaRequest(cita);
      toast.success("Cita actualizada con éxito.");
      getCitas(); // Actualizar la lista de citas
    } catch (error) {
      toast.error("Error al actualizar la cita.");
    }
  };

  // Función para eliminar una cita
  const deleteCita = async (id) => {
    try {
      await deleteCitaRequest(id);
      toast.success("Cita eliminada con éxito.");
      getCitas(); // Actualizar la lista de citas
    } catch (error) {
      toast.error("Error al eliminar la cita.");
    }
  };

  // Función para obtener las citas de un cliente específico
  const getCitasByClient = async (id) => {
    try {
      const { data } = await getCitasClientRequest(id);
      setCitas(data);
    } catch (error) {
      toast.error("Error al cargar las citas del cliente.");
    }
  };
  const filtrarCitaDate = (fechaInicio, fechaFin) => {
    try {
      const filteredCitas = citas.filter(cita => {
        const fechaCita = new Date(cita.fecha); // Asegúrate de que la fecha esté en el formato correcto
        return fechaCita >= new Date(fechaInicio) && fechaCita <= new Date(fechaFin);
      });
      setCitas(filteredCitas); // Actualiza el estado de las citas con las filtradas
    } catch (error) {
      toast.error("Error al filtrar las citas por fecha.");
    }
  };
  return (
    <CitaContext.Provider value={{ 
      citas, 
      filtrarCitaDate,
    getCitas, 
    createCita, 
    updateCita, 
    deleteCita, 
    getCitasByClient }}>
      {children}
    </CitaContext.Provider>
  );
};
