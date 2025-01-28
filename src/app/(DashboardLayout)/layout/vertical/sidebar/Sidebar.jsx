import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SidebarItems from './SidebarItems';
import Logo from '../../shared/logo/Logo';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '@/app/components/custom-scroll/Scrollbar';
import { Profile } from './SidebarProfile/Profile';
import IconButton from "@mui/material/IconButton";
import {
  toggleSidebar,
  toggleMobileSidebar,
} from "@/store/customizer/CustomizerSlice";
import { IconMenu2 } from "@tabler/icons-react"; 
import Vendor from '@/app/components/crud-modal/vendor';
import Drivers from '@/app/components/crud-modal/drivers';
import Vehicles from '@/app/components/crud-modal/vehicles';
import Routes from '@/app/components/crud-modal/routes';
import History from '@/app/components/crud-modal/history';

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const lgDown = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse  
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;
 
  return (
    <>
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            ...(customizer.isCollapse && {
              position: 'absolute',
            }),
          }}
        >

          <Drawer
            anchor="left"
            variant="permanent"
            PaperProps={{
              sx: {
                transition: theme.transitions.create('width', {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            
            <Box
              sx={{
                height: '100%',
              }}
            >

              <Box >
    
                
              {customizer.isCollapse ? 
              
                <IconButton className='toggle-tech' color="inherit" aria-label="menu" 
                  onClick={
                    () => dispatch(toggleSidebar())
                  }
                >
                  <IconMenu2 size="40" />   
                </IconButton> 
              
              : 
              
                <IconButton className='toggle-tech collapse' color="inherit" aria-label="menu"
                  onClick={
                    () => dispatch(toggleSidebar())
                  }
                >
                  <IconMenu2 size="40" />  
                  
                  <Logo />
                </IconButton>
              
              }              

              </Box>

              <Scrollbar sx={{ height: 'calc(100% - 300px)' }}>

                <Vehicles/>
                 <Drivers/>
                 <Vendor/>                 
                 <Routes/>

                 <History/>

              </Scrollbar>
              <Profile />
            </Box>
          </Drawer>
        </Box>
      
        <Drawer
          anchor="left" 
          onClose={() => dispatch(toggleMobileSidebar())}
          variant="temporary"
          PaperProps={{
            sx: {
              width: customizer.SidebarWidth,
              border: '0 !important',
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
         
          <Box px={2}>
            <Logo />
          </Box>

          <SidebarItems />
        </Drawer>

    </>
  );
};

export default Sidebar;
