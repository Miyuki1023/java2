import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Collapse,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import Hogar from "../pages/Hogar";
import Producto from "../pages/Productos";
import AgregarP from "../pages/Productos1";
import VerCitasHost from "../pages/VerCitasHost";
import Dashboard from "../pages/Panel";
import Cliente from "../pages/Clientes";
import  AgregarCitas  from '../pages/AgregarCitas';
import Notificaciones from '../pages/Notificacion';
import Factura from '../pages/Factura';
import { Receipt } from '@mui/icons-material'; // Importa el ícono de Receipt

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  })
);

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isPedidosOpen, setIsPedidosOpen] = useState(true);
  const [isProductosOpen, setIsProductosOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Hogar');
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5); // Número de notificaciones

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
    navigate("/");
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

  const handleNotificationClick = () => {
    setSelectedPage('Notificaciones');
    setNotificationCount(0); // Restablecer el contador
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'Hogar':
        return <Hogar />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Ver Citas':
        return <VerCitasHost />;
      case 'Añadir Nueva Cita':
        return <AgregarCitas />;
      case 'Ver Productos':
        return <Producto />;
      case 'Añadir Nuevo Producto':
        return <AgregarP />;
      case 'Clientes':
        return <Cliente />;
      case 'Notificaciones':
        return <Notificaciones />;
        case 'Factura':
        return <Factura />;
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
          <Typography variant="h6" noWrap style={{ flexGrow: 1, fontWeight: 'bold' }}>
            MOMOnails
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Notifications />
            {notificationCount > 0 && <span style={{ fontSize: '12px', marginLeft: '4px' }}>{notificationCount}</span>}
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
            <ListItem button onClick={() => setSelectedPage('Dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
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
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Añadir Nuevo Producto')}>
                  <ListItemText primary="Añadir Nuevo Producto" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={handlePedidosClick}>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary="Citas agendadas" />
              {isPedidosOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isPedidosOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Ver Citas')}>
                  <ListItemText primary="Ver Citas" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }} onClick={() => setSelectedPage('Añadir Nueva Cita')}>
                  <ListItemText primary="Añadir Nueva Cita" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => setSelectedPage('Clientes')}>
              <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>

            <ListItem button onClick={() => setSelectedPage('Notificaciones')}>
              <ListItemIcon><Notifications /></ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItem>

            <ListItem button onClick={() => setSelectedPage('Factura')}>
  <ListItemIcon><Receipt /></ListItemIcon>  {/* Cambié el ícono de Notifications a Receipt */}
  <ListItemText primary="Factura" />
</ListItem>
          </List>
        </Box>
      </Drawer>

      <Main open={isDrawerOpen}>
        <Toolbar />
        {renderContent()}
      </Main>
    </div>
  );
};

export default App;
