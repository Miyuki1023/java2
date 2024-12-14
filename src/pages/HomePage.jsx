import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container, Divider, Modal, AppBar, Toolbar, Grid } from "@mui/material";
import React, { useState } from 'react';
import './fuente/Gluten-Bold.woff';
import backgroundImage from './img/uy.jpg';
import coffi from './img/coffe.jpg';
import cuadrada from './img/cuadrada.jpg';
import almendra from './img/Almendradas.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const APP = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenRegisterModal = () => {
        console.log("Navegando a /register...");
        navigate("/register");
    };

    const handleCloseModal = () => setOpenModal(false);

    
    const ingresar = () => {
        console.log("Navegando a /login...");
        navigate('/login');
    };

    return (
        <div style={{ width: '100%', height: '100%', margin: 0 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ffc2cb' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Gluten-Bold' }}>
                        MOMOnails
                    </Typography>
                    <Button color="inherit" onClick={ingresar}>
                        Iniciar sesión
                    </Button>
                    <Button color="inherit" onClick={handleOpenRegisterModal}>
                        Registrarse
                    </Button>
                </Toolbar>
            </AppBar>

            <main>
                <Box position='flex'
                    sx={{
                        
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        py: 10,
                        height: '100vh',
                    }}
                ><br /><br /><br /> <br />
                    <Typography variant="h2" component="h1" sx={{ color: '#fffff' }}>
                        La belleza en tus manos
                    </Typography><br /><br />
                    <Typography variant="h4" sx={{ color: '#fffff' }}>
                        Descubre nuestros diseños exclusivos de manicura
                    </Typography>
                    <Button variant="contained" color="success" onClick={() => setOpenModal(true)}>
                        Ver
                    </Button>

                    <Modal open={openModal} onClose={handleCloseModal}>
                        <Box sx={{ padding: 2, textAlign: 'center', bgcolor: 'background.paper', boxShadow: 24, borderRadius: 1 }}>
                            <Typography variant="h5">Video Introductorio</Typography>
                            <iframe
                                width="450"
                                height="300"
                                src="https://www.youtube.com/embed/DQjFV9LJHxI?si=Qrr8Y4cLXMHeTP7j"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                                Cerrar
                            </Button>
                        </Box>
                    </Modal>
                </Box>

                <Container sx={{ py: 5 }} id="dise">
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {[
                            {
                                title: 'Coffin',
                                description: 'Los coffin tips son un estilo de tip de uña que se ha vuelto cada vez más popular en los últimos años.',
                                imgSrc: coffi,
                                link: '/register'
                            },
                            {
                                title: 'Cuadradas',
                                description: 'Este tipo de uña tienen forma de cuadrado. Tienen formas rectas, la punta está limada.',
                                imgSrc: cuadrada,
                                link: '/register'
                            },
                            {
                                title: 'Almendradas',
                                description: 'Este tipo de uñas son más largas y tienen forma de almendra.',
                                imgSrc: almendra,
                                link: '/register'
                            }
                        ].map((design) => (
                            <Box key={design.title} sx={{ textAlign: 'center', width: '250px', margin: '20px' }}>
                                <img src={design.imgSrc} alt={`Descripción de ${design.title}`} width="250" height="250" className="rounded-circle" />
                                <Typography variant="h5" sx={{ mt: 2 }}>{design.title}</Typography>
                                <Typography>{design.description}</Typography>
                                <Link to={design.link}>
                                    <Button variant="contained" sx={{ mt: 1 }}>
                                        Ver más &raquo;
                                    </Button>
                                </Link>
                            </Box>
                        ))}
                    </Box>

                    <Box>
                        <Grid container spacing={4} sx={{ padding: 4 }}>
                            <Grid item md={7}>
                                <Typography variant="h2" component="h2" gutterBottom>
                                    El arte de las uñas
                                    <span style={{ color: '#6c757d' }}> magia en tus uñas</span>
                                </Typography>
                                <Typography variant="body1">
                                    El proceso de pintar las uñas es elaborado y da los mejores resultados cuando lo realiza un artista de uñas experto. En primer lugar, se limpian las uñas y se elimina la piel muerta y las cutículas alrededor de las uñas. A partir de entonces, se les aplica una capa base de pintura, generalmente de color blanco, para garantizar que el diseño se vea bonito. En algunos casos, si se desea un aspecto natural, no se aplica una capa base. Se aplica una capa de esmalte de activación encima, lo que asegura que el diseño se seque rápidamente. Finalmente, el diseño requerido se pinta en la uña. Se prefieren los colores brillantes como el plateado, el dorado, el rojo, el azul, el verde y el negro a los colores más claros.
                                </Typography>
                            </Grid>
                            <div className="col-md-5" style={{padding:"20px",  borderRadius:"8px"}}><br />
                            <img 
                        src="https://i.pinimg.com/564x/bd/91/9c/bd919cf21538dc7f0d805cc2a85d3d92.jpg" 
                        alt="Descripción de la imagen" 
                        className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" 
                        width="300" 
                        height="300" 
                        borderRadius="8px"
                        
                    />
                     </div>
                        </Grid>
                        <hr className="featurette-divider" />

            <div className="row featurette" id="preguntasfrecuentes">
                <div className="col-md-7 order-md-2">
                    <br />
                    <br />
                    <h2 className="featurette-heading fw-normal lh-1">
                        Preguntas Frecuentes
                        <span className="text-body-secondary"> resolvemos sus dudas</span>
                    </h2>
                    <br />
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button 
                                    className="accordion-button" 
                                    type="button" 
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseOne" 
                                    aria-expanded="true"
                                    aria-controls="panelsStayOpen-collapseOne"
                                >
                                    ¿Qué me ofrece la página?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <strong>MomoNails</strong> te ofrece la mejor experiencia para tus uñas. Buscamos
                                    brindarte el mejor servicio ofreciendo diversos diseños para tus uñas....
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button 
                                    className="accordion-button collapsed" 
                                    type="button" 
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseTwo" 
                                    aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseTwo"
                                >
                                    ¿Cuáles son nuestras promociones?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <strong>En MomoNails</strong> hemos trabajado arduamente para ofrecerte promociones en
                                    cada temporada del año, para que puedas decorar tus uñas a un buen precio y lucirlas en
                                    cada temporada.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button 
                                    className="accordion-button collapsed" 
                                    type="button" 
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseThree" 
                                    aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseThree"
                                >
                                    ¿Atienden a domicilio?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <strong>En MomoNails</strong> queremos tu comodidad, por ello ya estamos atendiendo a domicilio a partir de 2 clientas a más. Eso sí, no atendemos a adolescentes menores de los 15 años por motivos de salud. 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 order-md-1">
                   <br /> <img 
                        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-personas-curiosidad_114360-11034.jpg?semt=ais_hybridcuadradas.jpg" 
                        alt="Descripción de la imagen" 
                        className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" 
                        width="500" 
                        height="500" 
                    />
                
            </div>
            <hr className="featurette-divider" />

         <div className="row featurette" id="redes">
    <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1">Síguenos en nuestras redes</h2>
        <br />
        <p>Encuéntranos en:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline-block', marginRight: '15px' }}>
                <a href="https://www.facebook.com/login/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                    Facebook
                    <i className="fab fa-facebook fa-2x"></i>
                </a>
            </li>
            <li style={{ display: 'inline-block', marginRight: '15px' }}>
                <a href="https://www.instagram.com/?hl=es-es" target="_blank" rel="noopener noreferrer">
                    Instagram
                    <i className="fab fa-instagram fa-2x"></i>
                </a>
            </li>
        </ul>
    </div>
    </div>
    </div>
                    </Box>
                </Container>

                <footer style={{ backgroundColor: '#ffc2cb', padding: '20px 0', margin: '0' }}>
                    <Typography variant="body1" align="center" sx={{ color: '#ffffff' }}>
                        &copy; 2024 MomoNails. Todos los derechos reservados.
                    </Typography>
                </footer>
            </main>
        </div>
    );
};

export default APP;
