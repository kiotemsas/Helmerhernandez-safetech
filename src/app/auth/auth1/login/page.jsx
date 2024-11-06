"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import PageContainer from '@/app/components/container/PageContainer';
import AuthLogin from '../../authForms/AuthLogin';
import { useUser } from '../../../context/UserContext';

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserData } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    const url = "https://parseapi.back4app.com/login";
    const headers = {
      "X-Parse-Application-Id": "NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR",
      "X-Parse-REST-API-Key": "deWxXGwOYr6ena7rovZkoLgrDtZhaw9w3cFsA4s1",
      "X-Parse-Revocable-Session": "1",
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const body = new URLSearchParams(credentials);

    try {
      const response = await fetch(url, { method: "POST", headers, body });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        localStorage.setItem("sessionToken", data.sessionToken);
        router.push("/"); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Unexpected error");
      console.error("Error:", error);
    }
  };

  const handleLoginSuccess = async (event) => {
    await handleLogin(event);
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