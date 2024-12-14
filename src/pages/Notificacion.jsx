import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notificacionSchema } from '../../../src/schemas/notificacion.schema';
import toast from 'react-hot-toast';
import { useNotificacion } from '../context/NotificacionContext';  // Import context
import { useParams } from 'react-router-dom'; 


export default function Notificaciones() {
  const { createNotificacion, updateNotificacion, deleteNotificacion, getNotificacion ,getTodasNotificaciones, notificaciones } = useNotificacion(); // Use context for actions
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(notificacionSchema),
  });

  const [loading, setLoading] = React.useState(true); 
  const [selectedNotificacion, setSelectedNotificacion] = useState(null);
  const params = useParams();

  // Submit handler for creating and editing notifications
  const onSubmit = async (data) => {
    console.log(errors);  // Verifica si hay errores en el formulario
    setLoading(true);
    try {
      if (params.id) {
        await updateNotificacion(params.id, {...data});
        toast.success('Notificación actualizada');
      } else {
        await createNotificacion(data); // Corregido: pasando el objeto data directamente
        toast.success('Nueva notificación creada');
      }
      navigate("/home");
    } catch (error) {
      console.error("Error al crear/editar producto:", error);
      toast.error('Error al guardar la notificación');
    } finally {
      setLoading(false); 
    }
};


  // Set form values to edit a notification
  const handleEdit = (notificacion) => {
    setSelectedNotificacion(notificacion);
    setValue('title', notificacion.title);
    setValue('description', notificacion.description);
    setValue('startDate', notificacion.startDate);
    setValue('endDate', notificacion.endDate);
  };

  // Handle deletion of a notification
  const handleDelete = async (id) => {
    try {
      await deleteNotificacion(id);
      toast.success('Notificación eliminada');
    } catch (error) {
      toast.error('Error al eliminar la notificación');
    }
  };

  // Fetch notifications when component mounts
  useEffect(() => {
    const loadNotificaciones = async () => {
    
        if (params.id) {
          const notiObtenidos = await getTodasNotificaciones();
          const notiEncontrado = notiObtenidos.find(n => n._id === params.id);
          if (notiEncontrado) {
            setTipo("endDate", notiEncontrado.endDate);
            setValue("title", notiEncontrado.title);
            setValue("description", notiEncontrado.description);
            setValue("startDate", notiEncontrado.startDate);
          }
        }
      };
      loadNotificaciones();
  }, [params.id,getTodasNotificaciones,setValue]);

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
    >
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 3 }}>
        {selectedNotificacion ? 'Editar Notificación' : 'Crear Nueva Notificación'}
      </Typography>

      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="title">Título</InputLabel>
        <Input
          id="title"
          {...register("title", { required: "Este campo es obligatorio" })}
          error={!!errors.title}
        />
        {errors.title && <FormHelperText error>{errors.title.message}</FormHelperText>}
      </FormControl>

      {/* Description Field */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="description">Descripción</InputLabel>
        <Input
          id="description"
          {...register("description", { required: "Este campo es obligatorio" })}
          error={!!errors.description}
        />
        {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}
      </FormControl>

      {/* Start Date Field */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="startDate">Fecha de inicio</InputLabel>
        <Input
          id="startDate"
          type="date"
          {...register("startDate", { required: "Este campo es obligatorio" })}
          error={!!errors.startDate}
        />
        {errors.startDate && <FormHelperText error>{errors.startDate.message}</FormHelperText>}
      </FormControl>

      {/* End Date Field */}
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="endDate">Fecha de finalización</InputLabel>
        <Input
          id="endDate"
          type="date"
          {...register("endDate", { required: "Este campo es obligatorio" })}
          error={!!errors.endDate}
        />
        {errors.endDate && <FormHelperText error>{errors.endDate.message}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {selectedNotificacion ? 'Actualizar Notificación' : 'Crear Notificación'}
      </Button>

      {/* Notifications Table */}
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Fecha de Finalización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificaciones.map((notificacion) => (
              <TableRow
                key={notificacion.id}
                hover
                onClick={() => handleEdit(notificacion)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{notificacion.title}</TableCell>
                <TableCell>{notificacion.description}</TableCell>
                <TableCell>{notificacion.startDate}</TableCell>
                <TableCell>{notificacion.endDate}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleEdit(notificacion);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
  variant="outlined"
  color="error"
  size="small"
  onClick={(e) => {
    e.stopPropagation(); // Evitar que el clic en la fila se dispare
    handleDelete(notificacion._id); // Eliminar la notificación
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
