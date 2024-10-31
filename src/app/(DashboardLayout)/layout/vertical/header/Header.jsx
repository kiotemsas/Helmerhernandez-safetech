import AppBar from "@mui/material/AppBar";
import { InputAdornment } from '@mui/material';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomOutlinedInput from '@/app/components/forms/theme-elements/CustomOutlinedInput';
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';

import Profile from "./Profile";
import Navigation from "./Navigation";
import MobileRightSidebar from "./MobileRightSidebar";
import { IconSearch, IconX } from '@tabler/icons-react';

import { FormGroup, FormControlLabel, FormControl } from '@mui/material';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';


const Header = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // drawer
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled className="header-tech" position="sticky" color="default">
      <ToolbarStyled>
       

        

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">


          {/* ------------------------------------------- */}
          {/* Search Dropdown */}
          {/* ------------------------------------------- */}

          
          <Box
              class="safetechcheck"
              alignItems="center"
              justifyContent="center"
              sx={{
                  display: {
                    xs: 'none',
                    lg: 'flex',
                  },
              }}
          >
            <FormControlLabel
              value="start"
              control={<CustomCheckbox  color="primary" /> }
              label={
                <>
                  <img src="images/svgs/icon-carperson.svg" className="profile-img" width="80px" height="auto" style={{ marginRight: "5px" }} />
                </>
              }
              labelPlacement="start"
            />


          </Box>



          <Box
              class="safetechcheck"
              alignItems="center"
              justifyContent="center"
              sx={{
                  display: {
                    xs: 'none',
                    lg: 'flex',
                  },
              }}
          >
            <FormControlLabel
              value="start"
              control={<CustomCheckbox  color="primary" /> }
              label={
                <>
                  <img src="images/svgs/icon-map.svg" className="profile-img" width="33px" height="auto" style={{ marginRight: "5px" }} />
                </>
              }
              labelPlacement="start"
            />


          </Box>
          


          <Box
              class="searchtoptech"
              alignItems="center"
              justifyContent="center"
              style={{ marginLeft: "35px" }}
              sx={{
                  display: {
                    xs: 'none',
                    lg: 'flex',
                  },
              }}
          >
            
            <CustomOutlinedInput           
              endAdornment={
                <InputAdornment position="end">
                  <IconSearch size="16" />
                </InputAdornment>
              }            
              placeholder="Driver or Plate text"
              fullWidth
            />

          </Box>



          {lgUp ? (
            <>
              <Navigation />
            </>
          ) : null}


          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
       
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
