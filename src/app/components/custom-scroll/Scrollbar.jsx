import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}));


const Scrollbar = (props) => {
  const { children, sx, ...other } = props;
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));



  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar;
