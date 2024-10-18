import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';




const Transition = React.forwardRef(function Transition(props, ref) {

  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';


  return <Slide class={hideMenu ? 'dialog-form' : 'dialog-form extended'} direction="right" ref={ref} {...props} />;


});

const TransitionDialog = () => {

  const customizer = useSelector((state) => state.customizer);
  const [open, setOpen] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';


  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl2(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const plus_menu = ({ props }) => (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 11.1792V18.283H0V11.1792H30ZM19.1182 0V30H10.9118V0H19.1182Z" fill="#202022" /></svg>)



  return (
    <>


      <Box class="plus-menu" >


        <Button

          aria-label=""
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? "primary.light" : "",
            color: anchorEl2
              ? "primary.main"
              : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}

        >

          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 11.1792V18.283H0V11.1792H30ZM19.1182 0V30H10.9118V0H19.1182Z" fill="#202022" />
          </svg>

          {customizer.isCollapse ? "" : <Typography
            variant="subtitle2"
            fontWeight="600"
            color="textPrimary"
            display="flex"
            alignItems="center"
            gap="4px"
          >

            OTROS ENLACES


          </Typography>}



        </Button>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "auto",
            },
            "& .MuiMenu-paper ul": {
              p: 0,
            },
          }}
        >



          <Box class={hideMenu ? 'bubble-list wipe' : 'bubble-list strip'}
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
            alignItems="center"
            justifyContent="space-between"
            pt={2}
            pr={4}
          >

            <Button class="bubble-link" fullWidth onClick={handleClickOpen}>
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

            <Button class="bubble-link" fullWidth onClick={handleClickOpen}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="textPrimary"
                display="flex"
                alignItems="center"
                gap="4px"
              >

                ROUTE
              </Typography>
            </Button>

            <Button class="bubble-link" fullWidth onClick={handleClickOpen}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="textPrimary"
                display="flex"
                alignItems="center"
                gap="4px"
              >

                DRIVER
              </Typography>
            </Button>

            <Button class="bubble-link" fullWidth onClick={handleClickOpen}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="textPrimary"
                display="flex"
                alignItems="center"
                gap="4px"
              >

                USER
              </Typography>
            </Button>



          </Box>



        </Menu>

      </Box>



      <Dialog
        variant="content"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogContent class="dialog-form-content">

          <Button class="close-dialog-form" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"NEW VEHICLE"} <Typography class="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>


          <Stack>
            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="object">OBJECT ID</CustomFormLabel>
              <CustomTextField id="object" placeholder="OBJECT ID" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="plate">PLATE NUMBER</CustomFormLabel>
              <CustomTextField id="plate" placeholder="PLATE NUMBER" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="model">MODEL</CustomFormLabel>
              <CustomTextField id="model" placeholder="MODEL" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="year">YEAR</CustomFormLabel>
              <CustomTextField id="year" placeholder="YEAR" variant="outlined" fullWidth />
            </Box>


            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="serial">SERIAL</CustomFormLabel>
              <CustomTextField id="serial" placeholder="SERIAL" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="brand">BRAND</CustomFormLabel>
              <CustomTextField id="brand" placeholder="BRAND" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="vendor">VENDOR</CustomFormLabel>
              <CustomTextField id="vendor" placeholder="VENDOR" variant="outlined" fullWidth />
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
                type="submit"
              >
                CREATE
              </Button>
            </Box>

          </Stack>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default TransitionDialog;
