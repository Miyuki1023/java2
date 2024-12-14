import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Collapse, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Notifications, AccountCircle, ExpandLess, ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import '../pages/fuente/Gluten-Bold.woff'; // Reemplazar con una importación CSS adecuada
import Hogar from "../pages/Hogar";
import Producto from "../pages/Productos";
import VerCitas from "../pages/vercitas";
import  AgregarCitas from '../pages/AgregarCitas'; // Usamos la exportación nombrada
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import modal from './ui/modal.notificacion'; // Importación de modal

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPedidosOpen, setIsPedidosOpen] = useState(false);
  const [isProductosOpen, setIsProductosOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Hogar');
  const [isMenuOpen, setIsMenuOpen] = useState(null); // Reemplaza anchorEl con isMenuOpen
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleMenuClick = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige después de cerrar sesión
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePedidosClick = () => {
    setIsPedidosOpen(!isPedidosOpen);
  };

  const handleProductosClick = () => {
    setIsProductosOpen(!isProductosOpen);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'Hogar':
        return <Hogar />;
      case 'Ver Productos':
        return <Producto />;
      case 'Agendar Nueva Cita':
        return <AgregarCitas />;
      case 'Ver Citas':
        return <VerCitas />;
      default:
        return <Typography variant="h3">Selecciona una sección</Typography>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ffc2cb' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Gluten-Bold' }}>
            MOMOnails
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenModal(true)}>
            <Notifications />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={isMenuOpen} open={Boolean(isMenuOpen)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>Configurar</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: '#e77195' }}>Cerrar Sesión</MenuItem>
      </Menu>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffc2cb',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setSelectedPage('Hogar')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Hogar" />
            </ListItem>
            <ListItem button onClick={handleProductosClick}>
              <ListItemIcon><InventoryIcon /></ListItemIcon>
              <ListItemText primary="Productos" />
              {isProductosOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isProductosOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Ver Productos')}>
                  <ListItemText primary="Ver Productos" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handlePedidosClick}>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary="Citas" />
              {isPedidosOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isPedidosOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Ver Citas')}>
                  <ListItemText primary="Ver mis Citas" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Agendar Nueva Cita')}>
                  <ListItemText primary="Agendar Nueva Cita" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      <Main open={isDrawerOpen}>
        <Toolbar />
        {renderContent()}
      </Main>

      <modal open={openModal} handleClose={() => setOpenModal(false)} /> {/* Agregar modal aquí */}
    </div>
  );
};

export default App;
