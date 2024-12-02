import React from 'react';
import { deleteVendor } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const DeleteVendor = ({ setOpen, handleClose, vendorId }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      if (session && session.accessToken) {
        const token = session.accessToken;
        const response = await deleteVendor(vendorId, token);
        alert(response.result.message);
        setOpen(false);
      } else {
        alert('No se ha encontrado una sesión activa.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el proveedor. Por favor, intente de nuevo.');
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <p>¿Está seguro de que desea eliminar este proveedor?</p>
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
      </Stack>
    </Box>
  );
};

export default DeleteVendor;