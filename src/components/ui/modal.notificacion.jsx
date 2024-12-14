import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNotificacion } from '../../context/NotificacionContext';  // Asegúrate de importar el hook

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NotificacionesModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Obtén las notificaciones del contexto
  const { notificaciones, getTodasNotificaciones } = useNotificacion();

  // Obtener todas las notificaciones cuando se abre el modal
  React.useEffect(() => {
    if (open) {
      getTodasNotificaciones();
    }
  }, [open, getTodasNotificaciones]);

  return (
    <div>
      <Button onClick={handleOpen}>Ver Notificaciones</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notificaciones
          </Typography>
          {notificaciones.length === 0 ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No tienes notificaciones
            </Typography>
          ) : (
            <div>
              {notificaciones.map((notif) => (
                <Box key={notif._id} sx={{ mb: 2 }}>
                  <Typography variant="body1">{notif.titulo}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {notif.descripcion}
                  </Typography>
                </Box>
              ))}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
