import React, { useEffect, useState } from 'react';
import { Container as MuiContainer } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useProducto } from '../context/ProductoContext';
import AgregarCitas from '../pages/AgregarCitas'; // Usamos la exportación nombrada

const Productos = () => {
  const { productos, getTodosProductos } = useProducto();
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();

  // Cargar los productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      await getTodosProductos();
      setLoading(false);
    };
    fetchData();
  }, [getTodosProductos]);

  // Actualizar productos filtrados cuando cambian los filtros o los productos
  useEffect(() => {
    let filtrados = productos;
    if (categoriaSeleccionada) {
      filtrados = filtrados.filter((producto) => producto.categoria === categoriaSeleccionada);
    }
    if (tipoSeleccionado) {
      filtrados = filtrados.filter((producto) => producto.tipo === tipoSeleccionado);
    }
    setProductosFiltrados(filtrados);
  }, [productos, categoriaSeleccionada, tipoSeleccionado]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    console.log('Producto agregado al carrito:', producto);
  };

  const mostrarCitas = (producto) => {
    // Redirige a la página de AppointmentForm pasando los datos del producto como state
    navigate('/citas-form', { state: { title: producto.title, description: producto.description, precio: producto.precio } });
    setMostrarFormulario(true);
  };

  return (
    <MuiContainer sx={{ width: '100%' }} className="Pedidos">
      {mostrarFormulario ? (
        <div>
          <Button
            variant="text"
            onClick={() => setMostrarFormulario(false)}
            sx={{ marginBottom: 2 }}
          >
            Volver a productos
          </Button>
          <AgregarCitas />
        </div>
      ) : (
        <div id="producto">
          <div id="ver">
            <div className="container">
              <main className="h22">
                <h2 className="text-center fw-bold producto-header">
                  "Realza tu estilo, reserva tu cita en MomoNails y luce unas manos espectaculares."
                </h2>
                <br /><br />

                {/* Selectores de categoría y tipo */}
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

                <div id="tablero" className="row justify-content-center">
                  {loading ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
                      Cargando productos...
                    </Typography>
                  ) : productosFiltrados.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
                      No se encontraron productos disponibles.
                    </Typography>
                  ) : (
                    productosFiltrados.map((producto, index) => (
                      <Card sx={{ maxWidth: 400, margin: '10px', height: '450px' }} key={index}>
                        <CardActionArea>
                          <CardContent
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                            }}
                          >
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary', marginBottom: 1 }}>
                              {producto.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                              {producto.description}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              Precio: S/{producto.precio}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                              {producto.tipo}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                              {producto.categoria}
                            </Typography>

                            <Button
                              variant="contained"
                              onClick={() => {
                                agregarAlCarrito(producto);
                                mostrarCitas(producto);
                              }}
                              sx={{
                                marginTop: 2,
                                backgroundColor: '#e77195',
                                '&:hover': { backgroundColor: '#d76085' },
                              }}
                            >
                              Separar cita
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </MuiContainer>
  );
};

export default Productos;
