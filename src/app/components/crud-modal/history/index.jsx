import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,  
  Box,  
  Grid,
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux'; 
import Slide from '@mui/material/Slide';
import Image from 'next/image'; 

//import GetVendors from './GetVendors';
 

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';

const Transition = React.forwardRef(function Transition(props, ref) {


  const customizer = useSelector((state) => state.customizer);
  const hideMenu = customizer.isCollapse;

  return <Slide className={hideMenu ? 'dialog-form bigger' : 'dialog-form bigger extended'} direction="right" ref={ref} {...props} />;

});



const handleChange = (e) => { 

};


const History = () => {
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const customizer = useSelector((state) => state.customizer);
  const hideMenu = customizer.isCollapse;
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  
  return (
    <> 


      <Button className={hideMenu ? 'btn-menu wipe' : 'btn-menu strip'} color="primary" fullWidth onClick={handleClickOpen}>
        

        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.2222 3.8H24.5556V0H20.7778V3.8H13.2222V0H9.44444V3.8H3.77778C1.69433 3.8 0 5.5043 0 7.6L0 31C0 33.0957 1.69433 35 3.77778 35H30.2222C32.3057 35 34 33.0957 34 31V7.6C34 5.5043 32.3057 3.8 30.2222 3.8ZM3.77778 31V9.5H30.2222L30.226 31H3.77778Z" fill="#202022"/>
          <path d="M7.55556 13.3H26.4444V17.1H7.55556V13.3ZM7.55556 20.9H17V24.7H7.55556V20.9Z" fill="#202022"/>
        </svg>

        {hideMenu ? '' : <Typography variant="h6">HISTORIAL</Typography>}

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

        <DialogTitle>{"HISTORIAL"} <Typography className="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>

        <DialogContent className="dialog-form-content">
          
          
          <Box width="100%">
            <Grid spacing={3} container>

              <Grid item lg={3} md={3} sm={3} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="phone">FECHA INICIAL</CustomFormLabel>

                  <CustomTextField id="phone" name="phone" placeholder="DD/MM/YY" variant="outlined" fullWidth
                    required={true}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }} />

                </Box>

              </Grid>

              <Grid item lg={3} md={3} sm={3} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="address">FECHA FINAL</CustomFormLabel>

                  <CustomTextField id="address" name="address" placeholder="DD/MM/YY" variant="outlined" fullWidth
                    required={true}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }} />

                </Box>

              </Grid>

              <Grid item lg={3} md={3} sm={3} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="address">HORA INICIAL</CustomFormLabel>

                  <CustomTextField id="address" name="address" placeholder="00:00" variant="outlined" fullWidth
                    required={true}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }} />

                </Box>

              </Grid>

              <Grid item lg={3} md={3} sm={3} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="address">HORA FINAL</CustomFormLabel>

                  <CustomTextField id="address" name="address" placeholder="00:00" variant="outlined" fullWidth
                    required={true}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }} />

                </Box>

              </Grid>

            </Grid>
          </Box>

          <Box>
                <Image src={"/images/profile/960X600.png"} alt="img" width={960} height={450} style={{width: '100%'}} />                    
          </Box>


        </DialogContent>

      </Dialog>


    </>
  );
};

export default History;