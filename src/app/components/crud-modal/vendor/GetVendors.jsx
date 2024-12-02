import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getVendors } from '@/utils/parse';
import EditVendor from './EditVendor';
import DeleteVendor from './DeleteVendor';

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

const GetVendors = ({ handleClose }) => {
  const { data: session } = useSession();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        if (session && session.accessToken) {
          const token = session.accessToken;
          const response = await getVendors(token);
          setVendors(response.result);
        } else {
          alert('No se ha encontrado una sesión activa.');
        }
      } catch (error) {
        console.error(error);
        alert('Error al obtener los proveedores. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [session]);

  const handleEditOpen = (vendor) => {
    setSelectedVendor(vendor);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedVendor(null);
  };

  const handleDeleteOpen = (vendor) => {
    setSelectedVendor(vendor);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setSelectedVendor(null);
  };

  const handleDeleteSuccess = (vendorId) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.objectId !== vendorId));
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
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">City</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Country</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Phone</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow
                  key={vendor.objectId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.name}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.address}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.city}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.country}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.phone}
                    </Typography>
                  </TableCell>

                  <TableCell scope="row">
                    <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                      {vendor.status}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button variant="contained" color="primary" onClick={() => handleEditOpen(vendor)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDeleteOpen(vendor)}>
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
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <EditVendor setOpen={setOpenEdit} handleClose={handleEditClose} vendor={selectedVendor} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleDeleteClose} fullWidth maxWidth="sm">
        <DialogTitle>Delete Vendor</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <DeleteVendor setOpen={setOpenDelete} handleClose={handleDeleteClose} vendorId={selectedVendor.objectId} onDeleteSuccess={handleDeleteSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GetVendors;