import React from 'react';
import {
  Button,
  Menu
} from '@mui/material';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography'; 
import { useSelector } from 'react-redux';
import {  IconPower } from '@tabler/icons-react'; 

import { useSession, signOut } from "next-auth/react"
import { useState } from "react";
import Createvehicle from '@/app/components/create/vehicle/index';
import Createroute from '@/app/components/create/route/index';
import Createdriver from '@/app/components/create/driver/index';
import CreateVendor from '@/app/components/create/vendor/index';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer); 
  const hideMenu =  customizer.isCollapse;
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { data: session } = useSession()

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  return ( 
    
    <Box>

      <Box className="plus-menu" >

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
 
          <Box className={hideMenu ? 'bubble-list wipe' : 'bubble-list strip'}
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
            <Createvehicle />
            <Createroute />
            <Createdriver/>
            <CreateVendor/>
          </Box>
 
        </Menu>

      </Box>

      <Box> 

        <Box
          display={'flex'}
          alignItems="center"
          gap={2}
          sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
          style={{margin:'0 auto', padding: '16px 10px', backgroundColor: 'unset'}}
        >
 
          {!hideMenu ? (
            <>
              <Avatar alt="" src={"/images/profile/user-1.jpg"} sx={{ height: 60, width: 60 }} />

              <Box>
                <Typography variant="h6">{session.user.name}</Typography>
                <Typography variant="caption">{session.user.email}</Typography>
              </Box>
              
              <Box sx={{ ml: 'auto' }}>
                <Tooltip title="Logout" placement="top">
                  <IconButton
                    color="primary"
                    onClick={() => signOut()}
                    aria-label="logout"
                    size="small"
                  >
                    
                    <IconPower size="20" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Avatar alt="" src={"/images/profile/user-1.jpg"} sx={{ height: 60, width: 60 }} />

            </>
          )}
        </Box>

      </Box>

    </Box>

  );
};
