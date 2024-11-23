import React, { useState } from 'react';
import { saveVehicle } from '@/utils/parse'; // Asegúrate de que esta función esté correctamente implementada
import { useSession } from 'next-auth/react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Button } from '@mui/material';

const SaveVehicle = ({ setOpen, handleClose }) => {
  const { data: session } = useSession();
  const [vehicleData, setVehicleData] = useState({
    plateNumber: '',
    model: '',
    year: '',
    serial: '',
    status: '',
    brand: '',
    defaultVendor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log('Datos de Session:', session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (session && session.accessToken) {
        const token = session.accessToken;
        const response = await saveVehicle(vehicleData, token);
        alert(response.result.message);
        setOpen(false);
      } else {
        alert('No se ha encontrado una sesión activa.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar el vehículo. Por favor, intente de nuevo.');
    }
  };

  const fields = [
    { label: 'PLATE NUMBER', name: 'plateNumber' },
    { label: 'MODEL', name: 'model' },
    { label: 'YEAR', name: 'year' },
    { label: 'SERIAL', name: 'serial' },
    { label: 'STATUS', name: 'status' },
    { label: 'BRAND', name: 'brand' },
    { label: 'VENDOR', name: 'defaultVendor' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {fields.map((field) => (
          <Box key={field.name} className="muitech">
            <CustomFormLabel className="nametech" htmlFor={field.name}>
              {field.label}
            </CustomFormLabel>
            <CustomTextField
              id={field.name}
              name={field.name}
              placeholder={field.label}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Box>
        ))}

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
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            CREATE
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default SaveVehicle;
