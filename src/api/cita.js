
import axios from './axios';

// Función para obtener todas las citas
export const getCitasRequest = async () => {
  return axios.get('/citas');
};

// Función para crear una cita
export const createCitaRequest = async (cita) => {
  return axios.post('/citas', cita);
};

// Función para actualizar una cita
export const updateCitaRequest = async (cita) => {
  return axios.put(`/citas/${cita._id}`, cita);
};

// Función para eliminar una cita
export const deleteCitaRequest = async (id) => {
  return axios.delete(`/citas/${id}`);
};

// Función para obtener citas de un cliente específico
export const getCitasClientRequest = async (id) => {
  return axios.get(`/citas/${id}`);
};
