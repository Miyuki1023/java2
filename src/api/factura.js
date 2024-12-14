import axios from 'axios';

export const createFacturaRequest = async (factura) => axios.post("/facturas", factura);

export const getAllFacturasRequest = async () => axios.get("/facturas");

export const getFacturaRequest = async (id) => axios.get(`/facturas/${id}`);

export const updateFacturaRequest = async (factura) => axios.put(`/facturas/${factura._id}`, factura);

export const deleteFacturaRequest = async (id) => axios.delete(`/facturas/${id}`);
