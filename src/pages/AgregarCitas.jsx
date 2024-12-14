import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Input, FormHelperText } from '@mui/material';
import { useCitas } from '../context/CitaContext'; // Asegúrate de tener este archivo correctamente configurado
import { citaSchema } from '../../../src/schemas/cita.schema'; // Verifica la ruta del schema
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

//PRODUCTOS
const productosOptions = [
  {
    id: '675438a68f0176c7280bf0f4',
    tipo: 'Manicure Spa',
    title: 'Manicura de Gel',
    description: 'Disfruta de un esmalte brillante y duradero. Perfecto para quienes buscan estilo y durabilidad.',
    categoria: 'Bodas',
    precio: 60,
  },
  {
    id: '675438ba8f0176c7280bf0f6',
    tipo: 'Manicure Spa',
    title: 'Manicura Pedicure Combinada',
    description: '¡El combo perfecto! Disfruta de un tratamiento completo de manos y pies.',
    categoria: 'Bodas',
    precio: 80,
  },
  {
    id: '675438cd8f0176c7280bf0f8',
    tipo: 'Manicure Spa',
    title: 'Manicura con Diseño Artístico',
    description: 'Agrega un toque único a tus manos con un diseño personalizado.',
    categoria: 'Clásicas',
    precio: 80,
  },
  {
    id: '675438ee8f0176c7280bf0fa',
    tipo: 'Manicure Spa',
    title: 'Manicura de Aromaterapia',
    description: 'Relájate con una manicura acompañada de un baño aromático.',
    categoria: 'Clásicas',
    precio: 80,
  },
  {
    id: '6754390f8f0176c7280bf0fc',
    tipo: 'Manicure Spa',
    title: 'Manicura Rusa',
    description: '¿Poco tiempo? Aprovecha nuestra manicura express, en solo 30 minutos tendrás uñas perfectas.',
    categoria: 'Clásicas',
    precio: 80,
  },
  {
    id: '67543a468f0176c7280bf652',
    tipo: 'Manicure',
    title: 'Manicura Acrílica con Dijes de Cristales',
    description: 'Uñas acrílicas de alta calidad decoradas con dijes de cristales brillantes.',
    categoria: 'Clásicas',
    precio: 80,
  },
  {
    id: '67543b598f0176c7280bf654',
    tipo: 'Manicure',
    title: 'Manicura Japonesa',
    description: 'Tratamiento natural para fortalecer tus uñas y darles un brillo espectacular.',
    categoria: 'Clásicas',
    precio: 70,
  },
  {
    id: '67543c1a8f0176c7280bf656',
    tipo: 'Manicure',
    title: 'Manicura Francesa',
    description: 'El clásico estilo francés para un acabado elegante y sofisticado.',
    categoria: 'Clásicas',
    precio: 75,
  },
  {
    id: '67543cde8f0176c7280bf658',
    tipo: 'Manicure Spa',
    title: 'Manicura de Parafina',
    description: 'Hidrata y suaviza tus manos con este tratamiento especial.',
    categoria: 'Spa',
    precio: 90,
  },
  {
    id: '67543d998f0176c7280bf65a',
    tipo: 'Manicure',
    title: 'Manicura Efecto Mate',
    description: 'Un acabado moderno y elegante para tus uñas.',
    categoria: 'Clásicas',
    precio: 65,
  },
];


// Opciones de hora
const horaOptions = [
  { value: '8:15 a 10:00' },
  { value: '10:15 a 12:00' },
  { value: '14:15 a 16:00' },
  { value: '16:15 a 18:00' },
  { value: '18:15 a 20:00' },
  { value: '20:15 a 22:00' },
];

// Métodos de pago
const paymentMethods = [
  { value: 'Yape', label: 'Yape' },
  { value: 'Plin', label: 'Plin' },
  { value: 'Transferencia', label: 'Transferencia' },
];

const generateRandomAccountNumber = () => Math.floor(Math.random() * 1000000000); 

export default function AgregarCitas() {
  const { createCita, updateCita, getCitas } = useCitas();
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors }
  } = useForm({
    resolver: zodResolver(citaSchema),
  });

  const location = useLocation();
  const { title, description, precio, _id: diseño } = location.state || {};
  const [randomAccount, setRandomAccount] = useState(generateRandomAccountNumber());
  const [hora, setHora] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [estado, setEstado] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const params = useParams();

  const handleRegresar = () => {
    navigate('/home');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === 'Transferencia') {
      setRandomAccount(generateRandomAccountNumber());
    }
  };

  const onSubmit = async (data) => {
    console.log(errors);  
    setLoading(true);
    try {
      const citaData = {
        ...data,
        diseño: { title, description, precio },
        producto: productoSeleccionado,  // Se incluye el producto seleccionado
      };
  
      if (params.id) {
        await updateCita(params.id, citaData); 
        toast.success("Cita actualizada correctamente");
      } else {
        await createCita(citaData); 
        toast.success("Nueva cita agregada");
      }
      navigate("/home"); 
    } catch (error) {
      toast.error("Ocurrió un error al guardar la cita");
      console.error("Error al procesar la cita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCitas = async () => {
      if (params.id) {
        const citasObtenidas = await getCitas();
        const citaEncontrada = citasObtenidas.find((c) => c._id === params.id);
        if (citaEncontrada) {
          setValue("fecha", citaEncontrada.fecha);
          setValue("hora", citaEncontrada.hora);
          setValue("nombre", citaEncontrada.nombre);
          setValue("celular", citaEncontrada.celular);
          setValue("estado", citaEncontrada.estado);
        }
      }
    };
    loadCitas();
  }, [params.id, getCitas, setValue]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, maxWidth: 700, margin: 'auto' }}>
      <center>
        <Typography variant="h4" gutterBottom> Agendar Cita para Manicura </Typography>
      </center>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="nombre">Nombre del Cliente</InputLabel>
        <Input id="nombre" {...register("nombre", { required: "Este campo es obligatorio" })} error={!!errors.nombre} />
        {errors.nombre && <FormHelperText error>{errors.nombre.message}</FormHelperText>}
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="celular">Número de Celular</InputLabel>
        <Input id="celular" {...register('celular')} error={!!errors.celular} />
        {errors.celular && <FormHelperText error>{errors.celular.message}</FormHelperText>}
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="fecha">Fecha de la cita</InputLabel>
        <Input id="fecha" type="date" {...register("fecha")} error={!!errors.fecha} />
        {errors.fecha && <FormHelperText error>{errors.fecha.message}</FormHelperText>}
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="hora">Hora</InputLabel>
        <Select id="hora" value={hora} onChange={(event) => { setHora(event.target.value); setValue("hora", event.target.value); }} required>
          {horaOptions.map((hora, index) => (
            <MenuItem key={index} value={hora.value}>{hora.value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="paymentMethod">Método de Pago</InputLabel>
        <Select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} required>
          {paymentMethods.map((method) => (
            <MenuItem key={method.value} value={method.value}>{method.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="producto">Producto</InputLabel>
        <Select
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
          required
        >
          <MenuItem value="">
            <em>Selecciona un producto</em>
          </MenuItem>
          {productosOptions.map((producto) => (
            <MenuItem key={producto.id} value={producto.id}>
              {producto.title} - {producto.precio} soles
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="estado">Estado</InputLabel>
        <Select
          id="estado"
          value={estado}
          onChange={(e) => { setEstado(e.target.value); setValue("estado", e.target.value); }}
          required
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Cancelada">Cancelada</MenuItem>
          <MenuItem value="Completado">Completado</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? 'Guardando...' : params.id ? 'Actualizar Cita' : 'Agregar Cita'}
      </Button>

      <Button variant="contained" color="secondary" onClick={handleRegresar} fullWidth>
        Regresar
      </Button>
    </Box>
  );
}