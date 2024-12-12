import { FC, useState } from 'react';

import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Scrollbar from "@/app/components/custom-scroll/Scrollbar";


import LargeCard from '@/app/components/card-details/LargeCard';
import SmallCard from '@/app/components/card-details/SmallCard';

const SidebarWidth = 'calc(100vw - 45%)';

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
        className='Drawer-safetech'
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
        <Scrollbar  sx={{ height: 'calc(100vh)' }}>

          <Button className="close-Drawer" onClick={() => setShowDrawer(false)}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.929 31.3667L31.5552 17.1821C31.717 17.0132 31.8313 16.8302 31.8981 16.6332C31.966 16.4362 32 16.2251 32 16C32 15.7748 31.966 15.5638 31.8981 15.3668C31.8313 15.1697 31.717 14.9868 31.5552 14.8179L17.929 0.591029C17.5516 0.197009 17.0799 0 16.5138 0C15.9477 0 15.4625 0.211082 15.0582 0.633245C14.6538 1.05541 14.4516 1.54793 14.4516 2.11082C14.4516 2.6737 14.6538 3.16623 15.0582 3.58839L26.9457 16L15.0582 28.4116C14.6808 28.8056 14.4921 29.2908 14.4921 29.8672C14.4921 30.4447 14.6942 30.9446 15.0986 31.3667C15.5029 31.7889 15.9747 32 16.5138 32C17.0529 32 17.5246 31.7889 17.929 31.3667Z" fill="#202022"/>
              <path d="M3.47731 31.3667L17.1036 17.1821C17.2653 17.0132 17.3796 16.8302 17.4464 16.6332C17.5144 16.4362 17.5483 16.2251 17.5483 16C17.5483 15.7748 17.5144 15.5638 17.4464 15.3668C17.3796 15.1697 17.2653 14.9868 17.1036 14.8179L3.47731 0.591029C3.09992 0.197009 2.62819 0 2.06212 0C1.49604 0 1.01083 0.211082 0.606493 0.633245C0.202152 1.05541 -1.71661e-05 1.54793 -1.71661e-05 2.11082C-1.71661e-05 2.6737 0.202152 3.16623 0.606493 3.58839L12.4941 16L0.606493 28.4116C0.229109 28.8056 0.0404148 29.2908 0.0404148 29.8672C0.0404148 30.4447 0.242586 30.9446 0.646925 31.3667C1.05127 31.7889 1.52299 32 2.06212 32C2.60124 32 3.07297 31.7889 3.47731 31.3667Z" fill="#202022"/>
            </svg>
          </Button>


          <Box className="group-card">
              <Stack spacing={2} style={{width: '50%'}}> 
                <Typography className="title-item-card"  variant="h6">VEHICLE ALERT</Typography>
                <Box className="side-card">                  
                  <SmallCard/>
                </Box> 
              </Stack> 
              <Stack spacing={2} style={{width: '50%'}}>   
                <Typography className="title-item-card" variant="h6">VEHICLE ON ROUTE</Typography>             
                <Box className="side-card">                  
                  <LargeCard />
                </Box>
              </Stack>
          
          </Box> 

        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
