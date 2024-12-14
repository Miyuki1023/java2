import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar, Box, Container } from "@mui/material";
import React, { useState } from 'react';
import '../pages/fuente/Gluten-Bold.woff'; 



const Navbar = () => {
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button color="inherit" onClick={ingresar}>
                            Iniciar sesión
                        </Button>
                        <Button color="inherit" onClick={handleOpenRegisterModal}>
                            Registrarse
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: '64px' }}> 
            </Container>
        </div>
    );
};

export default Navbar;
