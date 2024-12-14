import { createContext, useContext, useState } from "react";
import {
  createNotificacionRequest,
  deleteNotificacionRequest,
  getTodasNotificacionesRequest,
  updateNotificacionRequest,
  getNotificacionRequest,
} from "../api/notificacion";

const NotificacionContext = createContext();

export const useNotificacion = () => {
  const context = useContext(NotificacionContext);
  if (!context) throw new Error("useNotificacion must be used within a NotificacionProvider");
  return context;
};

export function NotificacionProvider({ children }) {
  const [notificaciones, setNotificaciones] = useState([]);

  // Obtener todas las notificaciones
  const getTodasNotificaciones = async () => {
    try {
      const res = await getTodasNotificacionesRequest();
      setNotificaciones(res.data);
    } catch (error) {
      console.error("Error al obtener las notificaciones", error);
    }
  };

  // Crear una nueva notificación
  const createNotificacion = async (notificacion) => {
    try {
      const res = await createNotificacionRequest(notificacion);
      if (res.data) {
        setNotificaciones((prevNotificaciones) => [...prevNotificaciones, res.data]);
      }
    } catch (error) {
      console.error("Error al crear la notificación", error);
    }
  };

  // Obtener una notificación por ID
  const getNotificacion = async (id) => {
    try {
      const res = await getNotificacionRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener la notificación", error);
    }
  };

  // Actualizar una notificación
  const updateNotificacion = async (id, notificacion) => {
    try {
      const res = await updateNotificacionRequest(id, notificacion);
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notif) => (notif._id === id ? res.data : notif))
      );
    } catch (error) {
      console.error("Error al actualizar la notificación", error);
    }
  };

  // Eliminar una notificación
  const deleteNotificacion = async (id) => {
    try {
      const res = await deleteNotificacionRequest(id);
      if (res.status === 204) {
        setNotificaciones((prevNotificaciones) =>
          prevNotificaciones.filter((notif) => notif._id !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar la notificación", error);
    }
  };

  return (
    <NotificacionContext.Provider
      value={{
        notificaciones,
        getTodasNotificaciones,
        createNotificacion,
        getNotificacion,
        updateNotificacion,
        deleteNotificacion,
      }}
    >
      {children}
    </NotificacionContext.Provider>
  );
}
