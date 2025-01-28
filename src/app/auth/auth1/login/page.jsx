"use client"
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PageContainer from '@/app/components/container/PageContainer';
import AuthLogin from '../../authForms/AuthLogin';
import Image from 'next/image';
import Typography from '@mui/material/Typography';


export default function Login() {
  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
       
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="techboxlogin"
        >

          <Box p={4}>

            <Box position="relative">
              
              <Box
                alignItems="center"
                justifyContent="center"
                sx={{
                  display: {
                    xs: 'flex',
                    lg: 'flex',
                  },
                }}
              >
                <Image
                  src={"/images/logos/safetrack_logo.webp"}
                  alt="bg" width={300} height={100}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    maxHeight: 'auto',
                    marginBottom: '60px',
                  }}
                />
              </Box>
            </Box>
            
            <AuthLogin
            
            title=""
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
             
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                 
                </Typography>
                
              </Stack>
            }
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#693b8c, rgb(233 30 99 / 54%),rgba(104, 58, 183, 0.5));',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
          className='backgroundLogin'
        >
          <Box position="relative">
            
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  )
};


