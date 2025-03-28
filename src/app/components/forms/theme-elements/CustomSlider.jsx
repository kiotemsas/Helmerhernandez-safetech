import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '13px',
    borderRadius: '13px',
    opacity: '1',
    backgroundColor: "#9E9E9E",
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: "#E83E33",
    width: '0',
    height: '0',
  },
  '& .MuiSlider-track': {
    height: '13px',
    borderRadius: '13px',
    background: 'linear-gradient(93.77deg, #593A97 3.09%, #E83E33 96.91%)',

  },
}));

export default CustomSlider;
