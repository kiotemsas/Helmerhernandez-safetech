'use client';
import React, { useState } from 'react';
import { saveVendor } from '@/utils/parse';
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
import Link from 'next/link'; 

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {

  const customizer = useSelector((state) => state.customizer);
  const hideMenu = customizer.isCollapse;

  return <Slide className={hideMenu ? 'dialog-form' : 'dialog-form extended'} direction="right" ref={ref} {...props} />;

});

const steps = ['Create', 'Confirm']; 

const SaveVendor = () => {

  const { data: session } = useSession();
  const [vendorData, setVendorData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    status: '',
    phone: '',
  });

  const [idProveedor, setidProveedor] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const fields = [
    { label: 'NOMBRE', name: 'name' },
    { label: 'DIRECCIÓN', name: 'address' },
    { label: 'CIUDAD', name: 'city' },
    { label: 'PAÍS', name: 'country' },
    { label: 'ESTADO', name: 'status' },
    { label: 'TELÉFONO', name: 'phone' },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const isStepOptional = (step) => step === 1;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };

  const handleClose = () => {    
    setOpen(false);    
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
        const response = await saveVendor(vendorData, token);
        setidProveedor(response.result.id);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);        

      } else {
        //alert('No se ha encontrado una sesión activa.');
      }

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
                  CANCELAR
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  CREAR
                </Button>
              </Box>


            </Stack>
          </form>




        );
      case 1:
        return (

          <Box className="dialog-form-box">

            <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1"/>
              <g clip-path="url(#clip0_1_4)">
              <path d="M96 77.35L95.7351 76.7324C95.5109 76.1765 89.7434 63.2471 66.5509 63.2059C66.5306 63.2059 66.5102 63.2059 66.4898 63.2059C66.4694 63.2059 66.449 63.2059 66.4287 63.2059C43.2566 63.2471 37.4891 76.1765 37.2649 76.7324L37 77.35V87.1294C37 87.6853 37.3668 88.1794 37.8763 88.3441L46.2321 90.9794C45.8041 92.3176 45.58 93.7176 45.58 95.1588V96.9706C45.58 97.5471 46.0487 98 46.599 98H86.3807C86.9513 98 87.3997 97.5471 87.3997 96.9706V95.1588C87.3997 93.7176 87.1755 92.3176 86.7475 90.9794L95.0829 88.3441C95.6128 88.1794 95.9796 87.6853 95.9796 87.1088V77.35H96ZM89.0301 83.3618L83.5071 85.1118C79.3699 80.1088 72.6242 76.7941 66.6325 76.7941C60.6204 76.7941 53.7523 80.1088 49.5541 85.1324L43.9496 83.3618C43.6846 83.2794 43.5216 83.0324 43.5216 82.7647V78.8735C44.0311 78.05 45.2743 76.3412 47.6995 74.6529C52.2035 71.4824 58.725 69.8147 66.5102 69.7941C74.2953 69.7941 80.8169 71.4824 85.3209 74.6529C87.7257 76.3412 88.9893 78.05 89.4988 78.8735V82.7441C89.4784 83.0324 89.295 83.2794 89.0301 83.3618Z" fill="#202022"/>
              <path d="M66.5102 58.8824C73.0384 58.8824 78.3306 53.5361 78.3306 46.9412C78.3306 40.3462 73.0384 35 66.5102 35C59.982 35 54.6898 40.3462 54.6898 46.9412C54.6898 53.5361 59.982 58.8824 66.5102 58.8824Z" fill="#202022"/>
              </g>
              <defs>
              <clipPath id="clip0_1_4">
              <rect width="59" height="63" fill="white" transform="translate(37 35)"/>
              </clipPath>
              </defs>
            </svg>


            <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>¿Estás seguro de crear el siguiente proveedor? </Typography>

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

            PROVEEDOR

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

        <DialogTitle>{"CREAR PROVEEDOR"} <Typography className="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>

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
                    <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1"/>
                    <circle cx="113" cy="24" r="18" fill="#0CC71E"/>
                    <path d="M104 26.2L108.909 31L122 17" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <g clip-path="url(#clip0_1_34)">
                    <path d="M96 78.35L95.7351 77.7323C95.5109 77.1765 89.7434 64.247 66.5509 64.2059C66.5306 64.2059 66.5102 64.2059 66.4898 64.2059C66.4694 64.2059 66.449 64.2059 66.4287 64.2059C43.2566 64.247 37.4891 77.1765 37.2649 77.7323L37 78.35V88.1294C37 88.6853 37.3668 89.1794 37.8763 89.3441L46.2321 91.9794C45.8041 93.3176 45.58 94.7176 45.58 96.1588V97.9706C45.58 98.5471 46.0487 99 46.599 99H86.3807C86.9513 99 87.3997 98.5471 87.3997 97.9706V96.1588C87.3997 94.7176 87.1755 93.3176 86.7475 91.9794L95.0829 89.3441C95.6128 89.1794 95.9796 88.6853 95.9796 88.1088V78.35H96ZM89.0301 84.3618L83.5071 86.1118C79.3699 81.1088 72.6242 77.7941 66.6325 77.7941C60.6204 77.7941 53.7523 81.1088 49.5541 86.1323L43.9496 84.3618C43.6846 84.2794 43.5216 84.0323 43.5216 83.7647V79.8735C44.0311 79.05 45.2743 77.3412 47.6995 75.6529C52.2035 72.4823 58.725 70.8147 66.5102 70.7941C74.2953 70.7941 80.8169 72.4823 85.3209 75.6529C87.7257 77.3412 88.9893 79.05 89.4988 79.8735V83.7441C89.4784 84.0323 89.295 84.2794 89.0301 84.3618Z" fill="#202022"/>
                    <path d="M66.5102 59.8824C73.0384 59.8824 78.3306 54.5361 78.3306 47.9412C78.3306 41.3462 73.0384 36 66.5102 36C59.982 36 54.6898 41.3462 54.6898 47.9412C54.6898 54.5361 59.982 59.8824 66.5102 59.8824Z" fill="#202022"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_34">
                    <rect width="59" height="63" fill="white" transform="translate(37 36)"/>
                    </clipPath>
                    </defs>
                  </svg>



                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>Has creado un nuevo proveedor</Typography>
                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>Identificación del proveedor : {idProveedor}</Typography>

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
                    CERRAR

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
                        CERRAR
                      </Button>

                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={saveIt}>

                        CREAR

                      </Button>

                    </Box>

                  </> : ''} </>)}

          </Box>

        </DialogContent>

      </Dialog>

    </>

  );
};


export default SaveVendor;

