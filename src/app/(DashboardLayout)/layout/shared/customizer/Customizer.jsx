import { useState } from 'react';

import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Scrollbar from "@/app/components/custom-scroll/Scrollbar";


const SidebarWidth = ' 30vw ';

const Customizer = () => {

  const [showDrawer, setShowDrawer] = useState(false);  

  return (

    <div>

      <Tooltip title="Historial de actividad">
        <Fab
          color="#CACACA"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => setShowDrawer(true)}
        >
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3333 15.0618V10.4C21.3333 6.2179 18.42 2.6949 14.4733 1.6354C14.0827 0.676 13.128 0 12 0C10.872 0 9.91733 0.676 9.52667 1.6354C5.58 2.6962 2.66667 6.2179 2.66667 10.4V15.0618L0.390668 17.2809C0.266611 17.4014 0.168228 17.5447 0.101181 17.7024C0.0341335 17.8601 -0.000252599 18.0293 1.3969e-06 18.2V20.8C1.3969e-06 21.1448 0.140477 21.4754 0.390526 21.7192C0.640574 21.963 0.979713 22.1 1.33333 22.1H22.6667C23.0203 22.1 23.3594 21.963 23.6095 21.7192C23.8595 21.4754 24 21.1448 24 20.8V18.2C24.0003 18.0293 23.9659 17.8601 23.8988 17.7024C23.8318 17.5447 23.7334 17.4014 23.6093 17.2809L21.3333 15.0618ZM21.3333 19.5H2.66667V18.7382L4.94267 16.5191C5.06672 16.3986 5.16511 16.2553 5.23215 16.0976C5.2992 15.9399 5.33359 15.7707 5.33333 15.6V10.4C5.33333 6.8159 8.324 3.9 12 3.9C15.676 3.9 18.6667 6.8159 18.6667 10.4V15.6C18.6667 15.9458 18.8067 16.276 19.0573 16.5191L21.3333 18.7382V19.5ZM12 26C12.8257 26.001 13.6313 25.7512 14.3047 25.2852C14.978 24.8192 15.4858 24.1603 15.7573 23.4H8.24267C8.51422 24.1603 9.02197 24.8192 9.69535 25.2852C10.3687 25.7512 11.1743 26.001 12 26Z" fill="black"/>
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
              <Stack className='group-card-item' spacing={2} > 
                <Typography className="title-item-card"  variant="h6">Historial de actividad</Typography>
                <Box className="side-card">                  
                  
                </Box> 
              </Stack> 
             
          
          </Box> 

        </Scrollbar>
      </Drawer>
      
    </div>
  );
};

export default Customizer;
