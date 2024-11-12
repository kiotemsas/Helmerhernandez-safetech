 
import { useState } from 'react';
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

const AuthLogin = ({ title, subtitle, subtext }) => {
  const { data: session } = useSession(); 
  const [error, setError] = useState('');

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => { 

    e.preventDefault();
    
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (result.error) { 
      setError('Sign-in error: Username or  Password is Wrong', result.error);
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

    {error ? <Box mb={3}><Alert severity='error' >
        Sign-in error: Username or Password is Wrong
      </Alert></Box> : ''}


    <form onSubmit={handleSubmit}>
      <Stack>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="username">Username</CustomFormLabel>
          <CustomTextField id="username" variant="outlined" error={error !== ''}  placeholder="Username" fullWidth onChange={(e) => setusername(e.target.value)}/>
          
        </Box>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="password">Password</CustomFormLabel>
          <CustomTextField id="password" placeholder="password" error={error !== ''}  type="password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)}/>
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
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
                      class="passtech"
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
