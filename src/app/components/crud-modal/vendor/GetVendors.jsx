import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getVendors } from '@/utils/parse';

import {
  Button,
  Box,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { CircularProgress, Alert } from '@mui/material';

const GetVendors = ({ handleClose }) => {
  const { data: session } = useSession();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        if (session && session.accessToken) {
          const token = session.accessToken;
          const response = await getVendors(token);

          if (!response.result) {
            throw new Error('Error al obtener los proveedores');
          }

          setVendors(response.result);
        } else {
          setError('No se ha encontrado una sesión activa.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [session]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.objectId}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.address}</TableCell>
                <TableCell>{vendor.city}</TableCell>
                <TableCell>{vendor.country}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>{vendor.status}</TableCell>
                <TableCell>
                  <Stack spacing={2}>
                    <Box width="100%">
                      {/* <Button className="btn-modal" onClick={() => handleDetails(vendor.objectId)}> */}
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
      </Stack>
    </Box>
  );
};

export default GetVendors;