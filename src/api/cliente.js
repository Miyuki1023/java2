import axios from "./axios";

export const getClientesConCitas = () => {
    return axios.get("/clientes");
};
