import React, { useState, useEffect } from 'react';
import { getVehicles } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import {
  Button,
  Box,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,  
  Typography,
} from '@mui/material';

const GetVehicles = ({ handleClose }) => {
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (session && session.accessToken) {
          const token = session.accessToken;
          const response = await getVehicles(token);
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
  }, [session]);

  return (
    <Box>
      <Stack>
        <Box>
          <Table className="table-modal" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Plate</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Brand</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Model</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Vendor</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.objectId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vehicle.plateNumber}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vehicle.brand}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vehicle.model}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vehicle.defaultVendor}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box width="100%">
                        <Button className="btn-modal" onClick={handleClose}>
                          DETAILS
                        </Button>
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};

export default GetVehicles;
