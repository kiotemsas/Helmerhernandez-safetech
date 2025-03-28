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




import Search from '../../vertical/header/Search';


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
       
  
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
