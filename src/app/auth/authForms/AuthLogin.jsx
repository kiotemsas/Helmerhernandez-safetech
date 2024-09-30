import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';


const AuthLogin = ({ title, subtitle, subtext }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box className="muitech">
        <CustomFormLabel className="nametech" htmlFor="username">Username</CustomFormLabel>
        <CustomTextField id="username" placeholder="Username" variant="outlined" fullWidth />
      </Box>
      <Box className="muitech">
        <CustomFormLabel className="nametech" htmlFor="password">Password</CustomFormLabel>
        <CustomTextField id="password" placeholder="password" type="password" variant="outlined" fullWidth />
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
          href="/auth/auth1/forgot-password"
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
    {subtitle}
  </>
);

export default AuthLogin;
