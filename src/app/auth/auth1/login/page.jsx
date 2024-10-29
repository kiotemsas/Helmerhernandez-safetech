"use client";
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import PageContainer from '@/app/components/container/PageContainer';
import AuthLogin from '../../authForms/AuthLogin';

const Login = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
  };

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
                    xs: 'none',
                    lg: 'flex',
                  },
                }}
              >
                <Image
                  src="/images/logos/dark-logo.svg"
                  alt="bg"
                  width={300}
                  height={250}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    maxHeight: 'auto',
                  }}
                />
              </Box>
            </Box>
            
            <AuthLogin
              title="Login"
              onSuccess={handleLoginSuccess}
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
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
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
              <Image
                src="/images/backgrounds/login-bg.svg"
                alt="bg"
                width={800}
                height={500}
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;