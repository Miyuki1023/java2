import axios from "./axios";

export const readStats = () => {
    return axios.get("/stats");
};

export const graphicLine = () => {
    return axios.get("/graphicLine");
};

export const graphicBar = () => {
    return axios.get("/graphicBar");
};

export const graphicArea = () => {
    return axios.get("/graphicArea");
};

export const graphicPie = () => {
    return axios.get("/graphicPie");
};

