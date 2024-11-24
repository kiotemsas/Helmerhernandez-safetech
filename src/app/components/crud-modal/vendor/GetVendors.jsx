import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getVendors } from '@/utils/parse';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const GetVendors = () => {
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
        <List>
          {vendors.map((vendor) => (
            <ListItem key={vendor.objectId}>
              <ListItemText
                primary={vendor.name}
                secondary={`ID: ${vendor.objectId}, Address: ${vendor.address}, City: ${vendor.city}, Country: ${vendor.country}, Phone: ${vendor.phone}, Status: ${vendor.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default GetVendors;