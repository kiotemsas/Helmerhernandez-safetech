'use client';
import React, { useState } from 'react';
import { saveVehicle } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Button,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link'; 

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {

  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return <Slide className={hideMenu ? 'dialog-form' : 'dialog-form extended'} direction="right" ref={ref} {...props} />;

});

const steps = ['Create', 'Confirm']; 

const SaveVehicle = () => {

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

  const [idVehicle, setIdVehicle] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const [activeStep, setActiveStep] = React.useState(0);

  const isStepOptional = (step) => step === 1;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const saveIt = async(e) => {

    e.preventDefault();

    try {
      if (session) {

        const token = session.accessToken;
        const response = await saveVehicle(vehicleData, token);
        setIdVehicle(response.result.id);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

      } else {
        //alert('No se ha encontrado una sesión activa.');
      }

      s
    } catch (error) {
      //console.error(error);
      //alert('Error al guardar el vehículo. Por favor, intente de nuevo.');
    }



  }

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (


          <form onSubmit={handleSubmit}>
            <Stack >
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
                    required={true}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </Box>
              ))}
              <Box className="muitech-confirm">
                <Button
                  color="secondary"
                  variant="alone"
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
              </Box>


            </Stack>
          </form>




        );
      case 1:
        return (

          <Box className="dialog-form-box">

            <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1" />
              <path d="M90.9511 44.2825C90.2733 42.365 88.3756 41 86.1389 41H48.8611C46.6244 41 44.7606 42.365 44.0489 44.2825L37 63.75V89.75C37 91.5375 38.525 93 40.3889 93H43.7778C45.6417 93 47.1667 91.5375 47.1667 89.75V86.5H87.8333V89.75C87.8333 91.5375 89.3583 93 91.2222 93H94.6111C96.475 93 98 91.5375 98 89.75V63.75L90.9511 44.2825ZM48.8611 76.75C46.0483 76.75 43.7778 74.5725 43.7778 71.875C43.7778 69.1775 46.0483 67 48.8611 67C51.6739 67 53.9444 69.1775 53.9444 71.875C53.9444 74.5725 51.6739 76.75 48.8611 76.75ZM86.1389 76.75C83.3261 76.75 81.0556 74.5725 81.0556 71.875C81.0556 69.1775 83.3261 67 86.1389 67C88.9517 67 91.2222 69.1775 91.2222 71.875C91.2222 74.5725 88.9517 76.75 86.1389 76.75ZM43.7778 60.5L48.8611 45.875H86.1389L91.2222 60.5H43.7778Z" fill="#202022" />
            </svg>

            <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>Are you sure to create the following item  </Typography>

          </Box>

        );

      default:
        break;
    }
  };





  return (
    <>

      <Button className="bubble-link" fullWidth onClick={handleClickOpen}>
        <Typography
          variant="subtitle2"
          fontWeight="600"
          color="textPrimary"
          display="flex"
          alignItems="center"
          gap="4px"
        >

          VEHICLE
        </Typography>
      </Button>

      <Dialog
        variant="content"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <Button className="close-dialog-form" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
          </svg>
        </Button>

        <DialogTitle>{"NEW VEHICLE"} <Typography className="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>

        <DialogContent className="dialog-form-content">

          <Box width="100%">

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
              })}
            </Stepper>

            {activeStep === steps.length ? (

              <>

                <Box className="dialog-form-box">

                  <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1" />
                    <path d="M90.9511 44.2825C90.2733 42.365 88.3756 41 86.1389 41H48.8611C46.6244 41 44.7606 42.365 44.0489 44.2825L37 63.75V89.75C37 91.5375 38.525 93 40.3889 93H43.7778C45.6417 93 47.1667 91.5375 47.1667 89.75V86.5H87.8333V89.75C87.8333 91.5375 89.3583 93 91.2222 93H94.6111C96.475 93 98 91.5375 98 89.75V63.75L90.9511 44.2825ZM48.8611 76.75C46.0483 76.75 43.7778 74.5725 43.7778 71.875C43.7778 69.1775 46.0483 67 48.8611 67C51.6739 67 53.9444 69.1775 53.9444 71.875C53.9444 74.5725 51.6739 76.75 48.8611 76.75ZM86.1389 76.75C83.3261 76.75 81.0556 74.5725 81.0556 71.875C81.0556 69.1775 83.3261 67 86.1389 67C88.9517 67 91.2222 69.1775 91.2222 71.875C91.2222 74.5725 88.9517 76.75 86.1389 76.75ZM43.7778 60.5L48.8611 45.875H86.1389L91.2222 60.5H43.7778Z" fill="#202022" />
                    <circle cx="113" cy="24" r="18" fill="#0CC71E" />
                    <path d="M104 26.2L108.909 31L122 17" stroke="white" stroke-width="4" stroke-linecap="round" />
                  </svg>

                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>You have created a new item </Typography>
                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>vehicle ID: {idVehicle}</Typography>

                </Box>

                <Box className="muitech-confirm">

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/"
                    onClick={handleClose}
                  >
                    CLOSE

                  </Button>

                </Box>

              </>
            ) : (
              <>

                {handleSteps(activeStep)}

                {activeStep === steps.length - 1 ?

                  <>
                    <Box className="muitech-confirm">

                      <Button
                        color="primary"
                        variant="alone"
                        size="large"
                        fullWidth
                        component={Link}
                        href="/"
                        onClick={handleClose}
                      >
                        CLOSE
                      </Button>

                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={saveIt}>

                        CREATE

                      </Button>

                    </Box>

                  </> : ''} </>)}

          </Box>

        </DialogContent>

      </Dialog>

    </>

  );
};


export default SaveVehicle;

