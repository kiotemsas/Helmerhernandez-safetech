import { useState } from 'react';
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
import Parse from '../../../utils/parse';

const AuthLogin = ({ title, subtitle, subtext, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await Parse.User.logIn(username, password);
      const loggedIn = Parse.User.current();
      console.log('User', loggedIn);
      if (loggedIn) {
        onSuccess(); // Llama la función onSuccess en caso de login exitoso
      }
    } catch (error) {
      setErrorMessage("Error en el inicio de sesión");
      console.error("Error de inicio de sesión:", error);
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Stack>
        <Box className="muitech">
          <CustomFormLabel className="nametech" htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

      <Box className="muitech">
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
      {errorMessage && (
        <Typography color="error.main" mt={2}>{errorMessage}</Typography>
      )}
      {subtitle}
    </>
  );
};

export default AuthLogin;
