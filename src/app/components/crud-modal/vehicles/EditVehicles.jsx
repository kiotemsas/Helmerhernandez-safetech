import React, { useState } from 'react';
import { editVehicle } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Button } from '@mui/material';

const EditVehicle = ({ setOpen, handleClose, vehicle }) => {
  const { data: session } = useSession();
  const [vehicleData, setVehicleData] = useState(vehicle);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (session && session.accessToken) {
        const token = session.accessToken;
                
        const dataToSend = {
          id: vehicleData.objectId,
          plateNumber: vehicleData.plateNumber,
          model: vehicleData.model,
          year: vehicleData.year,
          serial: vehicleData.serial,
          status: vehicleData.status,
          brand: vehicleData.brand,
          defaultVendor: vehicleData.defaultVendor,
        };
                
        const response = await editVehicle(dataToSend, token);
        alert(response.result.message);
        setOpen(false);
      } else {
        alert('No se ha encontrado una sesión activa.');
      }
    } catch (error) {
      console.error('Error:', error); // Imprime el error en la consola
      alert(`Error al editar el vehículo. Por favor, intente de nuevo. Detalles: ${error.message}`);
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
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="objectId">
            OBJECT ID
          </CustomFormLabel>
          <CustomTextField
            id="objectId"
            name="objectId"
            placeholder="OBJECT ID"
            variant="outlined"
            fullWidth
            value={vehicleData.objectId}
            disabled
          />
        </Box>
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
              value={vehicleData[field.name]}
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
            UPDATE
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditVehicle;