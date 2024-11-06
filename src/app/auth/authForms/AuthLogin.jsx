import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Parse from '../../../utils/parse';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Maneja el cambio de campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Maneja el inicio de sesión
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Autentica al usuario usando Parse
      const user = await Parse.User.logIn(credentials.username, credentials.password);
      const sessionToken = user.getSessionToken();
      const userData = {
        objectId: user.id,
        username: user.get('username'),
        country: user.get('country'),
        address: user.get('address'),
        vendor: user.get('vendor'),
        city: user.get('city'),
        phone: user.get('phone'),
        email: user.get('email'),
        createdAt: user.get('createdAt'),
        updatedAt: user.get('updatedAt'),
        ACL: user.getACL(),
        sessionToken,
      };

      // Almacena los datos del usuario en localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Login exitoso:', userData);

      // Redirecciona al dashboard
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message || 'Error en el inicio de sesión');
      console.error('Error:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack component="form" onSubmit={handleLogin}>
        <Box className="muitech">
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            name="username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            value={credentials.username}
            onChange={handleChange}
          />
        </Box>
        <Box className="muitech">
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={credentials.password}
            onChange={handleChange}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Remember this Device" />
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
            ¿Forgot your password?
          </Typography>
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Login
        </Button>
        {errorMessage && (
          <Typography color="error.main" mt={2}>
            {errorMessage}
          </Typography>
        )}
      </Stack>

      {subtitle}
    </>
  );
};

export default AuthLogin;