import React, { useState, useEffect } from 'react';
import { editVendor } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Button } from '@mui/material';

const EditVendor = ({ setOpen, handleClose, vendor }) => {
  const { data: session } = useSession();
  const [vendorData, setVendorData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    status: '',
  });

  useEffect(() => {
    if (vendor) {
      setVendorData(vendor);
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (session && session.accessToken) {
        const token = session.accessToken;
        const response = await editVendor(vendorData, token);
        alert(response.result.message);
        setOpen(false);
      } else {
        alert('No se ha encontrado una sesión activa.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al editar el proveedor. Por favor, intente de nuevo.');
    }
  };

  const fields = [
    { label: 'NAME', name: 'name' },
    { label: 'ADDRESS', name: 'address' },
    { label: 'CITY', name: 'city' },
    { label: 'COUNTRY', name: 'country' },
    { label: 'PHONE', name: 'phone' },
    { label: 'STATUS', name: 'status' },
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
              value={vendorData[field.name]}
              onChange={handleChange}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
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
            SAVE
          </Button>  
        </Stack>           
      </Stack>
    </form>
  );
};

export default EditVendor;