 
import { useState } from 'react'; 
import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { TextField, Alert } from '@mui/material'
import Typography from '@mui/material/Typography';
import Link from "next/link";
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from "./AuthSocialButtons";
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import  ReCAPTCHA  from  "react-google-recaptcha";
import { dark } from '@mui/material/styles/createPalette';


const AuthLogin = ({ title, subtitle, subtext }) => {
  const { data: session } = useSession(); 
  const [error, setError] = useState('');

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const recaptchaRef = React.createRef();
 
  const handleSubmit = async (e) => { 
    
    e.preventDefault();

    if(!captcha) {
      setError('Compruebe que es humano, verifique el captcha.');
      return;
    }
    else{
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if (result.error) { 
        setError('Error de inicio de sesión: el nombre de usuario o la contraseña son incorrectos', result.error);
        recaptchaRef.current.reset();
        setCaptcha(null);
      }

    }
   

  };


  if (session) { 
    return redirect('/');
  }
  return (
    <> 


    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    {error ? <Box mb={3}><Alert Align="left" severity='error' >
        {error}
      </Alert></Box> : ''}


    <form onSubmit={handleSubmit}>
      
      <Stack>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="username">Username or Email</CustomFormLabel>
          <CustomTextField id="username" autoComplete="off" required={true} variant="outlined" error={error !== ''}  placeholder="Username" fullWidth onChange={(e) => setusername(e.target.value)}/>
          
        </Box>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="password">Password</CustomFormLabel>
          <CustomTextField id="password" required={true} placeholder="password" error={error !== ''}  type="password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)}/>
        </Box>



        <Box className="muitech">

              <ReCAPTCHA
                ref={recaptchaRef} 
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} 
                onChange={(e) => setCaptcha(recaptchaRef.current)} 
                className="captcha" 
                theme="dark"
              />

        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
         
          <Typography
            component={Link}
            href="#"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            
          </Typography>
        </Stack>
      </Stack>   
      
      <Box className="muitech"><Typography
                      component={Link}
                      href="/auth/auth1/forgot-password"
                      fontWeight="500"
                      className="passtech"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      ¿Forgot your password?
                    </Typography>  
      </Box>

      <Box className="muitech">


      

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth 
          type="submit"
        >
          Login
        </Button>
      </Box>

    </form>

    {subtitle}
    </>
  )
};


export default AuthLogin;
