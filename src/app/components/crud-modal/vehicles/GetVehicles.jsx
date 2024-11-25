import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { getVehicles } from '@/utils/parse';
import EditVehicles from './EditVehicles';
import DeleteVehicle from './DeleteVehicle';

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
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Alert,
} from '@mui/material';

const GetVehicles = ({ handleClose }) => {
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [session]);

  const handleEditOpen = (vehicle) => {
    console.log('Vehicle:', vehicle); // Agrega este console.log para verificar el contenido del objeto vehicle
    setSelectedVehicle(vehicle);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedVehicle(null);
  };

  const handleDeleteOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setSelectedVehicle(null);
  };

  const handleDeleteSuccess = (vehicleId) => {
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.objectId !== vehicleId));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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
                <TableCell>Actions</TableCell>
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
                      <Button variant="contained" color="primary" onClick={() => handleEditOpen(vehicle)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDeleteOpen(vehicle)}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>

      <Dialog open={openEdit} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <EditVehicles setOpen={setOpenEdit} handleClose={handleEditClose} vehicle={selectedVehicle} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleDeleteClose} fullWidth maxWidth="sm">
        <DialogTitle>Delete Vehicle</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <DeleteVehicle setOpen={setOpenDelete} handleClose={handleDeleteClose} vehicleId={selectedVehicle.objectId} handleDeleteSuccess={handleDeleteSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GetVehicles;