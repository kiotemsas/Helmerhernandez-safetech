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


const Routes = () => {
 

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
        

        <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_108_509)">
          <path d="M8.34133 0C3.73547 0 0 3.70288 0 8.26857C0 8.65504 0.0272 9.0415 0.0816 9.40999V9.41898C0.0906667 9.46392 0.0997333 9.51784 0.0997333 9.56278C0.816 14.2363 6.3104 21.5792 7.90613 23.6283C8.12373 23.907 8.54987 23.907 8.76747 23.6283C10.3632 21.5792 15.8667 14.2453 16.5739 9.56278C16.5829 9.51784 16.592 9.46392 16.592 9.41898V9.40999C16.6464 9.03251 16.6736 8.65504 16.6736 8.26857C16.6827 3.70288 12.9472 0 8.34133 0ZM8.34133 11.594C6.392 11.594 4.80533 10.0211 4.80533 8.08882C4.80533 6.15649 6.392 4.58366 8.34133 4.58366C10.2907 4.58366 11.8773 6.15649 11.8773 8.08882C11.8773 10.0211 10.2907 11.594 8.34133 11.594Z" fill="#202022"/>
          <path d="M25.6587 10.1558C21.0528 10.1558 17.3174 13.8586 17.3174 18.4243C17.3174 18.8108 17.3446 19.1973 17.399 19.5658V19.5747C17.408 19.6197 17.4171 19.6736 17.4171 19.7185C18.1334 24.3921 23.6278 31.7349 25.2235 33.7841C25.4411 34.0627 25.8673 34.0627 26.0849 33.7841C27.6806 31.7349 33.184 24.4011 33.8912 19.7185C33.9003 19.6736 33.9094 19.6197 33.9094 19.5747V19.5658C33.9638 19.1883 33.991 18.8108 33.991 18.4243C34 13.8586 30.2646 10.1558 25.6587 10.1558ZM25.6587 21.7497C23.7094 21.7497 22.1227 20.1769 22.1227 18.2446C22.1227 16.3123 23.7094 14.7394 25.6587 14.7394C27.608 14.7394 29.1947 16.3123 29.1947 18.2446C29.1947 20.1769 27.608 21.7497 25.6587 21.7497Z" fill="#202022"/></g><defs><clipPath id="clip0_108_509"><rect width="34" height="34" fill="white"/></clipPath></defs>
        </svg>

        {hideMenu ? '' : <Typography variant="h6">ROUTE’S</Typography>}

      </Button>

      <Dialog  fullWidth={fullWidth} maxWidth={hideMenu ?  'xl' :  'lg'}  open={open} onClose={handleClose}>

         <DialogContent class="crud-dialog">

          <Button class="close-dialog-crud" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"ROUTE’S"} <Typography>12/08/2024  10:08 PM</Typography></DialogTitle>

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

export default Routes;
