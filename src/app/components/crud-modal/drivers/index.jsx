import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery'; 
 

const rows = [
  {
    plate: 'UDS 837',
    brand: 'RENAULT',
    model: 'SANDERO',
    driver: 'CARLOS LOAIZA', 
  }, 

  {
    plate: 'UDS 837',
    brand: 'RENAULT',
    model: 'SANDERO',
    driver: 'MELLO DRUM', 
  }, 

  {
    plate: 'UDS 837',
    brand: 'RENAULT',
    model: 'SANDERO',
    driver: 'JOE DOE', 
  }, 
];


const Drivers = () => {
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  
  return (
    <> 


      <Button class={hideMenu ? 'btn-menu wipe' : 'btn-menu strip'} color="primary" fullWidth onClick={handleClickOpen}>
        

        <svg width="30" height="30" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0C20.2 0 22 1.8 22 4C22 6.2 20.2 8 18 8C15.8 8 14 6.2 14 4C14 1.8 15.8 0 18 0ZM36 14H24V40H20V28H16V40H12V14H0V10H36V14Z" fill="#202022"/>
        </svg>

        {hideMenu ? '' : <Typography variant="h6">DRIVER’S</Typography>}

      </Button>

      <Dialog  fullWidth={fullWidth} maxWidth={hideMenu ?  'xl' :  'lg'}  open={open} onClose={handleClose}>

         <DialogContent class="crud-dialog">

          <Button class="close-dialog-crud" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"DRIVER’S"} <Typography>12/08/2024  10:08 PM</Typography></DialogTitle>

          <Box> 

            <Table class="table-modal" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Plate</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Brand</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Model</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Driver</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    
                    <TableCell scope="row">
                      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                        {row.plate}
                      </Typography>
                    </TableCell>


                    <TableCell scope="row">
                      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                        {row.brand}
                      </Typography>
                    </TableCell>

                    <TableCell scope="row">
                      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                        {row.model}
                      </Typography>
                    </TableCell>

                    <TableCell scope="row">
                      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                        {row.driver}
                      </Typography>
                    </TableCell>

                     
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box width="100%">
                          <Button class="btn-modal" onClick={handleClose}>
                              DETAILS
                          </Button>
                        </Box>
                     
                      </Stack>
                    </TableCell>



                  </TableRow>
                ))}
              </TableBody>
            </Table>
          
          </Box>
        </DialogContent> 

      </Dialog>
    </>
  );
};

export default Drivers;
