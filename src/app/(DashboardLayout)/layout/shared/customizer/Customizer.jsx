import { FC, useState } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { IconX, IconSettings, IconCheck } from '@tabler/icons-react';
import {
  setTheme,
  setDir,
  setDarkMode,
  toggleLayout,
  toggleSidebar,
  toggleHorizontal,
  setBorderRadius,
  setCardShadow, 
} from '@/store/customizer/CustomizerSlice';
import Scrollbar from "@/app/components/custom-scroll/Scrollbar";
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import SwipeLeftAltTwoToneIcon from '@mui/icons-material/SwipeLeftAltTwoTone';
import SwipeRightAltTwoToneIcon from '@mui/icons-material/SwipeRightAltTwoTone';
import AspectRatioTwoToneIcon from '@mui/icons-material/AspectRatioTwoTone';
import CallToActionTwoToneIcon from '@mui/icons-material/CallToActionTwoTone';
import ViewSidebarTwoToneIcon from '@mui/icons-material/ViewSidebarTwoTone';
import WebAssetTwoToneIcon from '@mui/icons-material/WebAssetTwoTone';
import { ViewComfyTwoTone, PaddingTwoTone, BorderOuter } from '@mui/icons-material';

const SidebarWidth = '320px';

const Customizer = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useSelector((state) => state.customizer);

  const dispatch = useDispatch();

  const StyledBox = styled(Box)(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: '20px',
    cursor: 'pointer',
    justifyContent: 'center',
    display: 'flex',
    transition: '0.1s ease-in',
    border: '1px solid rgba(145, 158, 171, 0.12)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));

  const personIcon = ({ props }) => (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.071 31.3667L0.444774 17.1821C0.283038 17.0132 0.168745 16.8302 0.101894 16.6332C0.0339646 16.4362 0 16.2251 0 16C0 15.7748 0.0339646 15.5638 0.101894 15.3668C0.168745 15.1697 0.283038 14.9868 0.444774 14.8179L14.071 0.591029C14.4484 0.197009 14.9201 0 15.4862 0C16.0523 0 16.5375 0.211082 16.9418 0.633245C17.3462 1.05541 17.5484 1.54793 17.5484 2.11082C17.5484 2.6737 17.3462 3.16623 16.9418 3.58839L5.05425 16L16.9418 28.4116C17.3192 28.8056 17.5079 29.2908 17.5079 29.8672C17.5079 30.4447 17.3058 30.9446 16.9014 31.3667C16.4971 31.7889 16.0253 32 15.4862 32C14.9471 32 14.4754 31.7889 14.071 31.3667Z" fill="#202022"/>
    <path d="M28.5224 31.3667L14.8962 17.1821C14.7345 17.0132 14.6202 16.8302 14.5533 16.6332C14.4854 16.4362 14.4514 16.2251 14.4514 16C14.4514 15.7748 14.4854 15.5638 14.5533 15.3668C14.6202 15.1697 14.7345 14.9868 14.8962 14.8179L28.5224 0.591029C28.8998 0.197009 29.3716 0 29.9376 0C30.5037 0 30.9889 0.211082 31.3933 0.633245C31.7976 1.05541 31.9998 1.54793 31.9998 2.11082C31.9998 2.6737 31.7976 3.16623 31.3933 3.58839L19.5057 16L31.3933 28.4116C31.7706 28.8056 31.9593 29.2908 31.9593 29.8672C31.9593 30.4447 31.7572 30.9446 31.3528 31.3667C30.9485 31.7889 30.4768 32 29.9376 32C29.3985 32 28.9268 31.7889 28.5224 31.3667Z" fill="#202022"/>
    </svg>)

  const thColors = [
    {
      id: 1,
      bgColor: '#5D87FF',
      disp: 'BLUE_THEME',
    },
    {
      id: 2,
      bgColor: '#0074BA',
      disp: 'AQUA_THEME',
    },
    {
      id: 3,
      bgColor: '#763EBD',
      disp: 'PURPLE_THEME',
    },
    {
      id: 4,
      bgColor: '#0A7EA4',
      disp: 'GREEN_THEME',
    },
    {
      id: 5,
      bgColor: '#01C0C8',
      disp: 'CYAN_THEME',
    },
    {
      id: 6,
      bgColor: '#FA896B',
      disp: 'ORANGE_THEME',
    },
  ];

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* --Floating Button to open customizer ------ */}
      {/* ------------------------------------------- */}
      <Tooltip title="SafeTech">
        <Fab
          color="#CACACA"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => setShowDrawer(true)}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.071 31.3667L0.444774 17.1821C0.283038 17.0132 0.168745 16.8302 0.101894 16.6332C0.0339646 16.4362 0 16.2251 0 16C0 15.7748 0.0339646 15.5638 0.101894 15.3668C0.168745 15.1697 0.283038 14.9868 0.444774 14.8179L14.071 0.591029C14.4484 0.197009 14.9201 0 15.4862 0C16.0523 0 16.5375 0.211082 16.9418 0.633245C17.3462 1.05541 17.5484 1.54793 17.5484 2.11082C17.5484 2.6737 17.3462 3.16623 16.9418 3.58839L5.05425 16L16.9418 28.4116C17.3192 28.8056 17.5079 29.2908 17.5079 29.8672C17.5079 30.4447 17.3058 30.9446 16.9014 31.3667C16.4971 31.7889 16.0253 32 15.4862 32C14.9471 32 14.4754 31.7889 14.071 31.3667Z" fill="#202022"/>
            <path d="M28.5224 31.3667L14.8962 17.1821C14.7345 17.0132 14.6202 16.8302 14.5533 16.6332C14.4854 16.4362 14.4514 16.2251 14.4514 16C14.4514 15.7748 14.4854 15.5638 14.5533 15.3668C14.6202 15.1697 14.7345 14.9868 14.8962 14.8179L28.5224 0.591029C28.8998 0.197009 29.3716 0 29.9376 0C30.5037 0 30.9889 0.211082 31.3933 0.633245C31.7976 1.05541 31.9998 1.54793 31.9998 2.11082C31.9998 2.6737 31.7976 3.16623 31.3933 3.58839L19.5057 16L31.3933 28.4116C31.7706 28.8056 31.9593 29.2908 31.9593 29.8672C31.9593 30.4447 31.7572 30.9446 31.3528 31.3667C30.9485 31.7889 30.4768 32 29.9376 32C29.3985 32 28.9268 31.7889 28.5224 31.3667Z" fill="#202022"/>
          </svg>

        </Fab>
      </Tooltip>
      
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* ------------ Customizer Sidebar ------------- */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          <Box p={2} display="flex" justifyContent={'space-between'} alignItems="center">
            <Typography variant="h4">SafeTech</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
