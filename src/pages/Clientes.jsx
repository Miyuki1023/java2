import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getClientesConCitas } from '../api/cliente'; // API para obtener clientes

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  // Obtener los clientes con citas al cargar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getClientesConCitas(); // Llamada a la API
        setClientes(response.data); // Guardar datos en el estado
      } catch (error) {
        console.error('Error al cargar los clientes con citas:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 3 }}>
        Clientes con Citas
      </Typography>

      <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
        Lista de Clientes Registrados con Citas
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.celular}</TableCell>
                <TableCell>{cliente.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
