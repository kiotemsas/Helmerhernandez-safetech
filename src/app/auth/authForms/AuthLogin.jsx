import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {Alert } from '@mui/material'
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
<<<<<<< HEAD
import Parse from '../../../utils/parse';
import { useRouter } from 'next/navigation';

const AuthLogin = ({ title, subtitle, subtext, onSuccess }) => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
        router.push("/"); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Error, los datos de acceso son incorrectos");
      }
    } catch (error) {
      setErrorMessage("Unexpected error");
      console.error("Error:", error);
    }
  };
=======
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

const AuthLogin = ({ title, subtitle, subtext }) => {
  const { data: session } = useSession(); 
  const [error, setError] = useState('');

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

>>>>>>> 6b20178d7975b1b71a1ee20cad456c30c0cfcd84

  const handleSubmit = async (e) => {
    
    alert(username);
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (result.error) {
      // Handle successful sign-in
      setError('Sign-in error: Username or  Password is Wrong', result.error);
    }
  };
  if (session) {
    alert(username);
    return redirect('/');
  }
  return (
<<<<<<< HEAD
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}
=======
    <> 

>>>>>>> 6b20178d7975b1b71a1ee20cad456c30c0cfcd84

    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

<<<<<<< HEAD
      <Stack>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </Box>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
=======
    {subtext}

    {error ? <Box mt={3}><Alert severity='error' >
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
>>>>>>> 6b20178d7975b1b71a1ee20cad456c30c0cfcd84
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/auth1/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot your password?
          </Typography>
        </Stack>
      </Stack>

<<<<<<< HEAD
      <Box className="muitech">
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
      {errorMessage && (
        <Typography color="error.main" mt={2}>{errorMessage}</Typography>
      )}
      {subtitle}
=======
      
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
          component={Link}
          href="/"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </form>
    {subtitle}
>>>>>>> 6b20178d7975b1b71a1ee20cad456c30c0cfcd84
    </>
  )
};


export default AuthLogin;
