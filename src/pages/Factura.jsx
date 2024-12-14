import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useProducto } from '../context/ProductoContext';
import { useFactura } from '../context/FacturaContext';
import { Box, FormControl, InputLabel, Input, Button, Select, MenuItem, FormHelperText, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { facturaSchema } from '../../../src/schemas/factura.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import IconButton from '@mui/material/IconButton'; 
import DeleteIcon from '@mui/icons-material/Delete';  

const FacturaForm = () => {
    const { productos, getTodosProductos } = useProducto();
    const { createFactura } = useFactura();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
    } = useForm({
        resolver: zodResolver(facturaSchema),
    });

    const [dni, setDni] = useState('');
    const [ruc, setRuc] = useState('');
    const [email, setEmail] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [nombre, setNombre] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTodosProductos();
    }, [getTodosProductos]);

    const agregarProducto = () => {
        const producto = productos.find(p => p._id === productoSeleccionado);
        console.log(producto)
        if (producto) {
            setProductosSeleccionados([...productosSeleccionados, producto.id]);
            setPrecioTotal(precioTotal + producto.precio);
        }
    };

    const eliminarProducto = (productoId) => {
        const productoEliminado = productosSeleccionados.find(p => p._id === productoId);
        setProductosSeleccionados(productosSeleccionados.filter(p => p._id !== productoId));
        setPrecioTotal(precioTotal - productoEliminado.precio);
    };

    const onSubmit = async (data) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log("Datos que se enviarán:", { ...data, productos: productosSeleccionados, precioTotal });
            await createFactura({
                ...data,
                productos: productosSeleccionados,
                precioTotal: precioTotal,
            });
            toast.success("Factura creada exitosamente");
            navigate('/home');
        } catch (err) {
            console.error("Error al crear la factura", err);
            toast.error("Ocurrió un error al crear la factura");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
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
                Crear Factura
            </Typography>

            {/* Campo para el nombre */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="nombre">Nombre del Cliente</InputLabel>
                <Input
                    id="nombre"
                    {...register("nombre", { required: "Este campo es obligatorio" })}
                    error={!!errors.nombre}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {errors.nombre && <FormHelperText error>{errors.nombre.message}</FormHelperText>}
            </FormControl>

            {/* Campo para el DNI */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="dni">DNI</InputLabel>
                <Input
                    id="dni"
                    {...register("dni", { required: "Este campo es obligatorio" })}
                    error={!!errors.dni}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />
                {errors.dni && <FormHelperText error>{errors.dni.message}</FormHelperText>}
            </FormControl>

            {/* Campo para el RUC */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="ruc">RUC</InputLabel>
                <Input
                    id="ruc"
                    {...register("ruc", { required: "Este campo es obligatorio" })}
                    error={!!errors.ruc}
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                />
                {errors.ruc && <FormHelperText error>{errors.ruc.message}</FormHelperText>}
            </FormControl>

            {/* Campo para el email */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                    id="email"
                    {...register("email", { required: "Este campo es obligatorio" })}
                    error={!!errors.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
            </FormControl>

            {/* Select para el método de pago */}
            <FormControl fullWidth>
                <InputLabel>Método de Pago</InputLabel>
                <Select
                    {...register("metodoPago", { required: "Selecciona un método de pago" })}
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    error={!!errors.metodoPago}
                >
                    <MenuItem value="plin">Plin</MenuItem>
                    <MenuItem value="yape">Yape</MenuItem>
                    <MenuItem value="efectivo">Efectivo</MenuItem>
                    <MenuItem value="tarjeta">Tarjeta</MenuItem>
                    <MenuItem value="transferencia">Transferencia</MenuItem>
                </Select>
                {errors.metodoPago && <FormHelperText error>{errors.metodoPago.message}</FormHelperText>}
            </FormControl>

            {/* Select para elegir el producto */}
            <FormControl fullWidth>
                <InputLabel>Producto</InputLabel>
                <Select
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Selecciona un producto</em>
                    </MenuItem>
                    {productos.map((producto) => (
                        <MenuItem key={producto._id} value={producto._id}>
                            {producto.title} - ${producto.precio}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={agregarProducto} variant="contained" color="primary">
                Agregar Producto
            </Button>

            {/* Tabla de productos seleccionados */}
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productosSeleccionados.map((producto) => (
                            <TableRow key={producto._id}>
                                <TableCell>{producto.title}</TableCell>
                                <TableCell>${producto.precio}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => eliminarProducto(producto._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mt: 2 }}>Precio Total: ${precioTotal}</Typography>

            {/* Botón para enviar el formulario */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {loading ? "Cargando..." : "Crear Factura"}
            </Button>
        </Box>
    );
};

export default FacturaForm;
