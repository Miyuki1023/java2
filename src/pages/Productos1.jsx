import React, { useState, useEffect } from 'react';  // Aquí se importa useEffect
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { useProducto } from '../context/ProductoContext';
import toast from 'react-hot-toast';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productoSchema } from "../schemas/producto.schema";
import { zodResolver } from '@hookform/resolvers/zod';

export default function Productos1() {
  const { deleteProducto, createProducto, getTodosProductos, editProducto, productos } = useProducto();
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productoSchema),
  });

  const [loading, setLoading] = React.useState(true); 
  const [categoria, setCategoria] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [selectedProducto, setSelectedProducto] = React.useState(null);
  const navigate = useNavigate();
  
  const params = useParams();

  // Manejo de selección de categoría y tipo
  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log(errors);  // Verifica si hay errores en el formulario
    setLoading(true); // Deshabilitar el botón antes de hacer la solicitud
    try {
      if (params.id) {
        await editProducto(params.id, { ...data });
        toast.success("Productos cargados correctamente");
      } else {
        await createProducto({ ...data });
        toast.success("Nuevo producto agregado");
      }
      navigate("/home");
    } catch (error) {
      console.error("Error al crear/editar producto:", error);
      toast.error("Ocurrió un error al cargar los productos");
    } finally {
      setLoading(false); 
    }
  };
  
  

// Cargar todos los productos
useEffect(() => {
  const loadProductos = async () => {
    
    if (params.id) {
      const productosObtenidos = await getTodosProductos();
      const productoEncontrado = productosObtenidos.find(p => p._id === params.id);
      if (productoEncontrado) {
        setSelectedProducto(productoEncontrado);
        setCategoria(productoEncontrado.categoria);
        setTipo(productoEncontrado.tipo);
        setValue("title", productoEncontrado.title);
        setValue("description", productoEncontrado.description);
        setValue("precio", productoEncontrado.precio);
      }
    }
  };
  loadProductos();
}, [params.id, getTodosProductos, setValue]);




  const handleSelectProducto = (producto) => {
    setSelectedProducto(producto);
    setCategoria(producto.categoria);
    setTipo(producto.tipo);
    setValue("title", producto.title || "");
    setValue("description", producto.description || "");
    setValue("precio", producto.precio || 0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
        p: 3,
        bgcolor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '700px',
        margin: 'auto',
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 3 }}>
        {selectedProducto ? "Editar Producto" : "Agregar Nuevo Producto"}
      </Typography>

      {/* Campo para el título del producto */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="title">Título del Producto</InputLabel>
        <Input
          id="title"
          {...register("title", { required: "Este campo es obligatorio" })}
          error={!!errors.title}
        />
        {errors.title && <FormHelperText error>{errors.title.message}</FormHelperText>}
      </FormControl>

      {/* Campo para la descripción del producto */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="description">Descripción</InputLabel>
        <Input
          id="description"
          {...register("description", { required: "Este campo es obligatorio" })}
          error={!!errors.description}
        />
        {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}
      </FormControl>

      {/* Select para categoría */}
      <FormControl fullWidth>
        <Select
          {...register("categoria", { required: "Selecciona una categoría" })}
          value={categoria}
          onChange={handleCategoriaChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Selecciona categoría</em>
          </MenuItem>
          <MenuItem value="Navidad">Navidad</MenuItem>
          <MenuItem value="Halloween">Halloween</MenuItem>
          <MenuItem value="Año Nuevo">Año Nuevo</MenuItem>
          <MenuItem value="San Valentín">San Valentín</MenuItem>
          <MenuItem value="Día de la Madre">Día de la Madre</MenuItem>
          <MenuItem value="Bodas">Bodas</MenuItem>
          <MenuItem value="Clasicas">Clasicas</MenuItem>
        </Select>
        {errors.categoria && <FormHelperText error>{errors.categoria.message}</FormHelperText>}
      </FormControl>

      {/* Select para tipo */}
      <FormControl fullWidth>
        <Select
          {...register("tipo", { required: "Selecciona un tipo" })}
          value={tipo}
          onChange={handleTipoChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Selecciona tipo</em>
          </MenuItem>
          <MenuItem value="Manicure">Manicure</MenuItem>
          <MenuItem value="Pedicure">Pedicure</MenuItem>
          <MenuItem value="Manicure Spa">Manicure Spa</MenuItem>
          <MenuItem value="Pedicure Spa">Pedicure Spa</MenuItem>
        </Select>
        {errors.tipo && <FormHelperText error>{errors.tipo.message}</FormHelperText>}
      </FormControl>

      {/* Campo para el precio del producto */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="precio">Precio</InputLabel>
        <Input
          id="precio"
          type="number"
          {...register("precio", { required: "Este campo es obligatorio", valueAsNumber: true })}
          error={!!errors.precio}
        />
        {errors.precio && <FormHelperText error>{errors.precio.message}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {selectedProducto ? 'Actualizar Producto' : 'Agregar Producto'}
      </Button>
      
     <TableContainer component={Paper} sx={{ marginTop: 4 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Título</TableCell>
        <TableCell>Descripción</TableCell>
        <TableCell>Precio</TableCell>
        <TableCell>Categoría</TableCell>
        <TableCell>Tipo</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {productos.map((producto) => (
        <TableRow
          key={producto.id}
          hover
          onClick={() => handleSelectProducto(producto)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{producto.title}</TableCell>
          <TableCell>{producto.description}</TableCell>
          <TableCell>${producto.precio}</TableCell>
          <TableCell>{producto.categoria}</TableCell>
          <TableCell>{producto.tipo}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic en el botón "Editar" active el onClick de la fila
                handleSelectProducto(producto);
              }}
            >
              Editar
            </Button>
            <Button
  variant="outlined"
  color="error"
  size="small"
  onClick={(e) => {
    e.stopPropagation(); // Evitar que el clic en el botón "Eliminar" active el onClick de la fila
    deleteProducto(producto._id); // Asegúrate de pasar _id aquí, no id
    toast.success("Producto eliminado");
  }}
>
  Eliminar
</Button>

          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </Box>
  );
}