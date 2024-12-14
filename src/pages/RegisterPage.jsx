import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerSchema } from "../schemas/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import './fuente/Gluten-Bold.woff';


function RegisterPage() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data); // Verifica los datos aquí.
    await signup(data);
  };
  

  
  useEffect(() => {
    if (isAuthenticated){
       navigate("/");
  }
  }, [isAuthenticated, navigate]);

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
        >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
       
        <form onSubmit={handleSubmit(onSubmit)}
          style={{
            width: '500px',
            backgroundColor: '#ffffff',
            padding: '20px',
            border: '2px solid #ffc2cb',
            borderRadius: '20px',
          }}
          aria-live="polite"
        > 
          <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Gluten-Bold', color: '#e77195' }}>
            MOMOnails
          </Typography>
          <Typography variant="h5" style={{ color: '#e77195' }} align="center">
            Registrarse
          </Typography><br />
          {Array.isArray(registerErrors) &&
          registerErrors.map((error, i) => (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }} key={i}>
              {typeof error === "string" ? error : JSON.stringify(error)}
            </Alert>
          ))}


          <TextField
            label="Nombre de usuario"
            type="text"
            fullWidth
            variant="outlined"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            autoFocus
            sx={{ mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1e88e5',
                },
              },
            }}
          />
          <br />

          <TextField
            label="Correo electrónico"
            fullWidth
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1e88e5',
                },
              },
            }}
          /><br />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1e88e5',
                },
              },
            }}
          /><br />

          <TextField
            label="Confirma contraseña"
            type="password"
            fullWidth
            variant="outlined"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1e88e5',
                },
              },
            }}
          /><br />
             <Button 
             variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                bgcolor: "#e77195",
                
              }}
            >
          Registrarse 
          </Button>

          <br />          <br />

          <div>
          <Typography variant="body2" align="center" color="text.secondary">
          ¿Ya tienes una cuenta? {" "}
              <Link
                to="/login" 
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
                Iniciar sesión
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
              </div>
              <br/>

        </form>
      </Box>
      </Box>
  );
};

export default RegisterPage;