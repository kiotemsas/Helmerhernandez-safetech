import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons-react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import { IconChevronDown, IconHelp } from "@tabler/icons-react";
import { useState } from "react";


export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';


  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const plus_menu = ({ props }) => (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 11.1792V18.283H0V11.1792H30ZM19.1182 0V30H10.9118V0H19.1182Z" fill="#202022"/></svg>)


  return (
  
    

<Box>

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
              <path d="M30 11.1792V18.283H0V11.1792H30ZM19.1182 0V30H10.9118V0H19.1182Z" fill="#202022"/>
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

                        
                      </Typography> } 

            

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
                    

                    <Link class="bubble-link" href="/faq">
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
                    </Link>

                    <Link class="bubble-link" href="/faq">
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
                    </Link>

                    <Link class="bubble-link" href="/faq">
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
                    </Link>

                    <Link class="bubble-link" href="/faq">
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
                    </Link>

                  </Box>



          </Menu>

</Box>

<Box>

  

 <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
         


      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} sx={{height: 40, width: 40}} />

          <Box>
            <Typography variant="h6">Mathlew</Typography>
            <Typography variant="caption">Designer</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/auth/auth1/login"
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
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} sx={{height: 40, width: 40}} />

        </>
      )}
    </Box>

    </Box>

    </Box>

  );
};
