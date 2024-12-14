import { createContext, useContext, useState } from "react";
import {
  createProductoRequest,
  deleteProductoRequest,
  getTodosProductosRequest,
  updateProductoRequest,
  getProductoRequest,
} from "../api/producto";

const ProductoContext = createContext();

export const useProducto = () => {
  const context = useContext(ProductoContext);
  if (!context) throw new Error("useProducto must be used within a ProductoProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const [tipoSeleccionada, setTipoSeleccionada] = useState("");


  const getTodosProductos = async () => {
    try {
      const res = await getTodosProductosRequest();
      console.log(res.data);  
      setProductos(res.data); 
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  };

  // Eliminar un producto
  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id); // Asume que id es _id
      if (res.status === 204) {
        setProductos((prevProductos) => prevProductos.filter((producto) => producto._id !== id)); 
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };
  

  // Crear un nuevo producto
  const createProducto = async (producto) => {
    try {
      const res = await createProductoRequest(producto);
      if (res.data) {
        setProductos((prevProductos) => [...prevProductos, res.data]);
      }
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };
  

  // Obtener un producto por ID
  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data; // Retorna los datos del producto
    } catch (error) {
      console.error("Error al obtener el producto", error);
    }
  };

  // Actualizar un producto
  const updateProducto = async (id, producto) => {
    try {
      const res = await updateProductoRequest(id, producto);
      setProductos((prevProductos) =>
        prevProductos.map((prod) => (prod._id === id ? res.data : prod)) 
      );
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };
   // Filtrar productos por categoría
   const filtrarProductosPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    if (categoria === "") {
      setProductosFiltrados(productos); // Mostrar todos los productos si no hay categoría seleccionada
    } else {
      const filtrados = productos.filter((producto) => producto.categoria === categoria);
      setProductosFiltrados(filtrados);
    }
  };
 // Filtrar productos por categoría
 const filtrarProductosPorTipo = (tipo) => {
  setTipoSeleccionada(tipo);
  if (tipo === "") {
    setProductosFiltrados(productos); // Mostrar todos los productos si no hay categoría seleccionada
  } else {
    const filtrados = productos.filter((producto) => producto.tipo === tipo);
    setProductosFiltrados(filtrados);
  }
};


  return (
    <ProductoContext.Provider
      value={{
        productos,
        getTodosProductos,
        deleteProducto,
        createProducto,
        getProducto,
        updateProducto,
        filtrarProductosPorTipo,
        filtrarProductosPorCategoria,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
}
