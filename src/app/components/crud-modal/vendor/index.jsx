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
import GetVendors from './GetVendors';
 

const Vendor = () => {
 

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
        

          <svg width="30" height="30" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_108_503)">
            <path d="M32 22.8555L31.8563 22.5222C31.7347 22.2222 28.6066 15.2444 16.0276 15.2222C16.0166 15.2222 16.0055 15.2222 15.9945 15.2222C15.9834 15.2222 15.9724 15.2222 15.9613 15.2222C3.39344 15.2444 0.265285 22.2222 0.143696 22.5222L0 22.8555V28.1333C0 28.4333 0.198964 28.6999 0.475302 28.7888L5.00725 30.2111C4.77513 30.9333 4.65354 31.6888 4.65354 32.4666V33.4444C4.65354 33.7555 4.90777 33.9999 5.20622 33.9999H26.7827C27.0922 33.9999 27.3354 33.7555 27.3354 33.4444V32.4666C27.3354 31.6888 27.2138 30.9333 26.9817 30.2111L31.5026 28.7888C31.79 28.6999 31.9889 28.4333 31.9889 28.1222V22.8555H32ZM28.2197 26.0999L25.2242 27.0444C22.9803 24.3444 19.3216 22.5555 16.0718 22.5555C12.8111 22.5555 9.08601 24.3444 6.80898 27.0555L3.76926 26.0999C3.62556 26.0555 3.53713 25.9222 3.53713 25.7777V23.6777C3.81347 23.2333 4.48774 22.3111 5.80311 21.3999C8.24594 19.6888 11.7831 18.7888 16.0055 18.7777C20.228 18.7777 23.7651 19.6888 26.2079 21.3999C27.5123 22.3111 28.1976 23.2333 28.4739 23.6777V25.7666C28.4629 25.9222 28.3634 26.0555 28.2197 26.0999Z" fill="#202022"/><path d="M16.0055 12.8889C19.5463 12.8889 22.4166 10.0036 22.4166 6.44444C22.4166 2.88528 19.5463 0 16.0055 0C12.4648 0 9.59448 2.88528 9.59448 6.44444C9.59448 10.0036 12.4648 12.8889 16.0055 12.8889Z" fill="#202022"/></g><defs><clipPath id="clip0_108_503"><rect width="32" height="34" fill="white"/>
            </clipPath></defs>
          </svg>

        {hideMenu ? '' : <Typography variant="h6">PROVEEDORES</Typography>}

      </Button>

      <Dialog  fullWidth={fullWidth} maxWidth={hideMenu ?  'xl' :  'lg'}  open={open} onClose={handleClose}>

         <DialogContent className="crud-dialog">

          <Button className="close-dialog-crud" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"PROVEEDORES"} <Typography>12/08/2024  10:08 PM</Typography></DialogTitle>

          <Box>            

            <GetVendors handleClose={handleClose} />
          
          </Box>
        </DialogContent> 

      </Dialog>      
    </>
  );
};

export default Vendor;