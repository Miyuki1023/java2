import React from 'react'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './fuente/Gluten-Bold.woff';
// Crea un componente estilizado de imagen
const StyledImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
});

// Función para crear datos de la tabla
function createData(tipo, duracion, precio, detalles) {
    return { tipo, duracion, precio, detalles };
}

const rows = [
    createData('Manicura clásica', '30 min', 'S/15.00', 'Limpieza básica y esmaltado'),
    createData('Manicura francesa', '45 min', 'S/20.00', 'Esmaltado con estilo francés'),
    createData('Manicura de gel', '60 min', 'S/30.00', 'Esmaltado en gel de larga duración'),
    createData('Manicura spa', '75 min', 'S/40.00', 'Tratamiento con exfoliación y masaje'),
    createData('Manicura de acrílico', '90 min', 'S/50.00', 'Aplicación de uñas de acrílico'),
];

// Componente principal que renderiza la página de inicio
export default function Hogar() {
    return (
        <>
                        
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
                    <Typography variant="h4" gutterBottom>
                        Conoce MOMOnails
                    </Typography>

                    <StyledImage src="https://img.freepik.com/foto-gratis/mujeres-hermoso-esmalte-unas_23-2149936857.jpg?uid=R129105104&ga=GA1.1.1102943875.1726871324&semt=ais_hybrid" alt="Manicura y Uñas" />

                    <Typography>
                        Todos nuestros servicios son integrales y con sistema de bioseguridad aplicadas en cada servicio.
                        Ofrecemos servicios y productos de manicure convencional, polish nails, uñas acrílicas, recubrimiento, mantenimiento y nuestro exclusivo manicure de karité con una hidratación profunda con los beneficios de la veloterapia.
                        Somos especialistas en Nail Art, técnica de trazado milimétrico realizado a mano con diseños exclusivos y en gran variedad que van acorde a tu estilo.
                        Nuestro personal está capacitado y orientado para la atención profesional que mereces.
                        Ven y disfruta la experiencia Only Nails.
                    </Typography>

                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                        <Table aria-label="tabla de servicios de manicura">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Tipo de Manicura</strong></TableCell>
                                    <TableCell align="right"><strong>Duración</strong></TableCell>
                                    <TableCell align="right"><strong>Precio</strong></TableCell>
                                    <TableCell align="right"><strong>Detalles</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.tipo}>
                                        <TableCell component="th" scope="row">
                                            {row.tipo}
                                        </TableCell>
                                        <TableCell align="right">{row.duracion}</TableCell>
                                        <TableCell align="right">{row.precio}</TableCell>
                                        <TableCell align="right">{row.detalles}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            
        </>
    );
}
