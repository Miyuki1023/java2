import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "../schemas/auth";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from "@mui/icons-material/Facebook";
import './fuente/Gluten-Bold.woff';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.email==="hikaruadri@gmail.com") {
        navigate("/home");
      } else{
        navigate("/homecliente");
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  

  
  return (
<Box
            sx={{
                backgroundColor: '#ffc2cb',
                height: '100vh', // Ocupa toda la altura de la ventana
                width: '100%', // Ocupa todo el ancho
                position: 'absolute', // Asegura que no haya desplazamiento
                top: 0, // Alinea al inicio
                left: 0, // Alinea al inicio
                margin: 0,
                padding: 0,
                overflow: 'hidden', // Evita scroll si hay contenido adicional
            }}
        ><Box  sx={{
    minHeight: "100vh",
    display: "flex",
    background: "#ffc2cb"
  }}
>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Gluten-Bold', color: '#e77195' }}>
            MOMOnails
          </Typography>
          <Typography variant="h5" style={{ color: '#e77195' }} align="center">
           Bienvenido
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Ingresa tus credenciales para continuar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
          {loginErrors && (
             <Box sx={{ mb: 2 }}>
               {Array.isArray(loginErrors)
                 ? loginErrors.map((error, index) => (
                     <Typography key={index} color="error">
                       {error}
                     </Typography>
                   ))
                 : <Typography color="error">{loginErrors}</Typography>}
             </Box>
           )}

            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Recordarme"
              />
              <Link
                to="/forgot-password"
                style={{
                  color: "#e77195 ",
                  textDecoration: "none",
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                bgcolor: "#e77195 ",
                
              }}
            >
              INICIAR SESIÓN
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: "divider" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 2 }}
              >
                O continúa con
              </Typography>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: "divider" }} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#ddd",
                  color: "#e77195 ",
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#ddd",
                  color: "#e77195 ",
                }}
              >
                Facebook
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                style={{
                  color: "#e77195",
                  textDecoration: "none",
                }}
              >
                Regístrate
              </Link>
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
          ¿Deseas regresar a la pagina principal? {" "}
              <Link
                to="/" 
                style={{ 
                  color: '#e77195',
                  textDecoration: 'none',
                  transition: 'color 0.3s, text-decoration 0.3s',
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff69b4';
                  e.currentTarget.style.textDecoration = 'underline';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e77195';
                  e.currentTarget.style.textDecoration = 'none';
                }} 
              >
                Retroceder
              </Link>
              </Typography>
          </form>
        </Box>
      </Container>
    </Box>
    </Box>
  );
}

export default LoginPage;