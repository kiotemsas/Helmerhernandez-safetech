import React, { useState } from 'react';
import { saveVehicle } from '@/utils/parse';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Button } from '@mui/material';
import Link from 'next/link';

const SaveVehicle = ({setOpen, handleClose}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await saveVehicle(vehicleData);
    console.log(response);
    alert(response.result.message);
    setOpen(false);
  }; 
  
  return (
    <>
      <Stack>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="object">
            OBJECT ID
          </CustomFormLabel>
          <CustomTextField
            id="object"
            placeholder="OBJECT ID"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="plate">
            PLATE NUMBER
          </CustomFormLabel>
          <CustomTextField
            id="plate"
            placeholder="PLATE NUMBER"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="model">
            MODEL
          </CustomFormLabel>
          <CustomTextField
            id="model"
            placeholder="MODEL"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="year">
            YEAR
          </CustomFormLabel>
          <CustomTextField
            id="year"
            placeholder="YEAR"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="serial">
            SERIAL
          </CustomFormLabel>
          <CustomTextField
            id="serial"
            placeholder="SERIAL"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="brand">
            BRAND
          </CustomFormLabel>
          <CustomTextField
            id="brand"
            placeholder="BRAND"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="vendor">
            VENDOR
          </CustomFormLabel>
          <CustomTextField
            id="vendor"
            placeholder="VENDOR"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Box className="muitech-confirm">
          <Button
            class="lineal"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            href="/"
            onClick={handleClose}
          >
            CANCEL
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            href="/"
            onClick={handleSubmit}
          >
            CREATE
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default SaveVehicle;
