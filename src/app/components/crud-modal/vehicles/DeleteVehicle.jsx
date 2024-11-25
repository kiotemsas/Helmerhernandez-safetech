import React from 'react';
import { useSession } from 'next-auth/react';

import { deleteVehicle } from '@/utils/parse';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const DeleteVehicle = ({ setOpen, handleClose, vehicleId, onDeleteSuccess }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      if (session && session.accessToken) {
        const token = session.accessToken;        
        
        const response = await deleteVehicle(vehicleId, token);
        alert(response.result.message);
        onDeleteSuccess(vehicleId);
        setOpen(false);
      } else {
        alert('No se ha encontrado una sesión activa.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el vehículo. Por favor, intente de nuevo.');
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
        >
          CANCEL
        </Button>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteVehicle;