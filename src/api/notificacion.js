import axios from "./axios";

export const getTodasNotificacionesRequest = async () => 
  axios.get("/notificaciones");

export const createNotificacionRequest = async (notificacion) => 
  axios.post("/notificaciones", notificacion);

export const deleteNotificacionRequest = async (id) => 
  axios.delete(`/notificaciones/${id}`);

export const updateNotificacionRequest = async (id, notificacion) => 
  axios.put(`/notificaciones/${id}`, notificacion);

export const getNotificacionRequest = async (id) => 
  axios.get(`/notificaciones/${id}`);
