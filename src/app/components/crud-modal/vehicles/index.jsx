import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,  
  Box,  
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux'; 
import GetVehicles from './GetVehicles';
 

const Vehicles = () => {
 

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
        

        <svg width="30" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.9556 1.89375C30.5667 0.787501 29.4778 0 28.1944 0H6.80556C5.52222 0 4.45278 0.787501 4.04444 1.89375L0 13.125V28.125C0 29.1562 0.875 30 1.94444 30H3.88889C4.95833 30 5.83333 29.1562 5.83333 28.125V26.25H29.1667V28.125C29.1667 29.1562 30.0417 30 31.1111 30H33.0556C34.125 30 35 29.1562 35 28.125V13.125L30.9556 1.89375ZM6.80556 20.625C5.19167 20.625 3.88889 19.3687 3.88889 17.8125C3.88889 16.2563 5.19167 15 6.80556 15C8.41944 15 9.72222 16.2563 9.72222 17.8125C9.72222 19.3687 8.41944 20.625 6.80556 20.625ZM28.1944 20.625C26.5806 20.625 25.2778 19.3687 25.2778 17.8125C25.2778 16.2563 26.5806 15 28.1944 15C29.8083 15 31.1111 16.2563 31.1111 17.8125C31.1111 19.3687 29.8083 20.625 28.1944 20.625ZM3.88889 11.25L6.80556 2.8125H28.1944L31.1111 11.25H3.88889Z" fill="#202022"/>
        </svg>

        {hideMenu ? '' : <Typography variant="h6">VEHÍCULOS</Typography>}

      </Button>

      <Dialog  fullWidth={fullWidth} maxWidth={hideMenu ?  'xl' :  'lg'}  open={open} onClose={handleClose}>

         <DialogContent className="crud-dialog">

          <Button className="close-dialog-crud" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"VEHÍCULOS"} <Typography>12/08/2024  10:08 PM</Typography></DialogTitle>

          <Box>           
            {/*<GetVehiclesByVendor vendorId="12345" />*/}
            <GetVehicles handleClose={handleClose} />
          
          </Box>
        </DialogContent> 

      </Dialog>      
    </>
  );
};

export default Vehicles;
