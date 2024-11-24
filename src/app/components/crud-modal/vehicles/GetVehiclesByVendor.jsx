import React, { useState, useEffect } from 'react';
import { getVehiclesByVendor } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const GetVehiclesByVendor = ({ vendorId }) => {
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (session && session.accessToken) {
          const token = session.accessToken;
          const response = await getVehiclesByVendor(vendorId, token);
          setVehicles(response.result);
        } else {
          alert('No se ha encontrado una sesión activa.');
        }
      } catch (error) {
        console.error(error);
        alert('Error al obtener los vehículos. Por favor, intente de nuevo.');
      }
    };

    fetchVehicles();
  }, [vendorId, session]);

  return (
    <Box>
      <List>
        {vehicles.map((vehicle) => (
          <ListItem key={vehicle.objectId}>
            <ListItemText
              primary={`${vehicle.brand} ${vehicle.model}`}
              secondary={`Plate Number: ${vehicle.plateNumber}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GetVehiclesByVendor;