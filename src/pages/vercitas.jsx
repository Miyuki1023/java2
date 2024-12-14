import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCitas } from '../context/CitaContext';
import { Button, TextField, FormControl, Select, MenuItem } from '@mui/material';

export function Citas({ clienteEmail }) {
  const { getCitas, getCitasCliente, deleteCita, updateCita, loading, error } = useCitas();
  const [citas, setCitas] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');

  // Handler para el cambio de fecha
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Obtener las citas al montar el componente
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        let data;
        if (clienteEmail) {
          // Obtener citas por cliente usando el correo electrónico
          data = await getCitasCliente(clienteEmail, selectedDate);
        } else {
          // Obtener todas las citas
          data = await getCitas(selectedDate);
        }

        // Asegurarse de que data sea un array
        setCitas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener citas", err);
        setCitas([]);
      }
    };

    fetchCitas();
  }, [getCitas, getCitasCliente, clienteEmail, selectedDate]);

  // Filtrar citas por la fecha seleccionada
  const filteredCitas = selectedDate
    ? citas.filter((cita) => cita.date === selectedDate)
    : citas;

  return (
    <Paper sx={{ marginTop: 3 }}>
      <center>
        <Typography variant="h5" sx={{ padding: 2 }}>
          Citas Agendadas
        </Typography>
      </center>

      {/* Selector de fecha */}
      <div>
        <Button sx={{ display: 'block', mt: 2 }} onClick={() => document.getElementById('date-picker').focus()}>
          Selecciona la fecha
        </Button>
        <TextField
          id="date-picker"
          label="Selecciona Fecha"
          type="date"
          value={selectedDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ m: 1, minWidth: 120 }}
        />
      </div>

      {/* Filtros para categoría y tipo */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <Select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
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
        </FormControl>

        <FormControl fullWidth>
          <Select
            value={tipoSeleccionado}
            onChange={(e) => setTipoSeleccionado(e.target.value)}
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
        </FormControl>
      </div>

      {/* Condición de no hay citas */}
      {filteredCitas.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
          No hay citas agendadas para esta fecha.
        </Typography>
      ) : (
        // Tabla de citas
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Número</strong></TableCell>
                <TableCell><strong>Diseño</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Hora</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCitas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.nombre}</TableCell>
                  <TableCell>{cita.celular}</TableCell>
                  <TableCell>{cita.diseño}</TableCell>
                  <TableCell>{cita.date}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => updateCita(cita.id)}
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Editar"}
                    </Button>
                    <Button
                      onClick={() => deleteCita(cita.id)}
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                    >
                      {loading ? "Eliminando..." : "Eliminar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default Citas;
