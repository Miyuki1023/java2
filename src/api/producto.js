import axios from "./axios";

export const getTodosProductosRequest = async () => 
  axios.get("/productos");

export const createProductoRequest = async (producto) => axios.post("/productos", producto);

export const deleteProductoRequest = async (id) => axios.delete(`/productos/${id}`);

export const updateProductoRequest = async (producto) =>
  axios.put(`/productos/${producto._id}`, producto);

export const getProductoRequest = async (id) =>
  axios.get(`/productos/${id}`);