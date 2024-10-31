import { CardContent, Typography, Grid, Button, Avatar, Box } from '@mui/material';
import { border, Stack } from '@mui/system';
import BlankCard from '../shared/BlankCard';
import Image from 'next/image';

const followerCard = [
  {
    title: 'Andrew Grant',
    location: 'El Salvador',
    avatar: "/images/profile/user-1.jpg",
  },
];

const FollowerCard = () => {
  return (
    <Grid container >
      {followerCard.map((card, index) => (
        <Grid item xs={12} sm={12} key={index}>
          <BlankCard className={"card-box"}>
           
            <CardContent class="card-flex red">

            <Box class="header-card"> 
              <Stack direction="row"  spacing={2} alignItems="center" justifyContent="space-between">
              
              
                <Stack  direction="row" spacing={2} alignItems="center" style={{width: '60%'}}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar class="avatar" src="/images/profile/user-1.jpg" alt="" />
                    <Box>
                      <Typography variant="h6">CARLOS LOAIZA</Typography>
                      <Typography variant="p">
                        UDS 837
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" style={{width: '40%'}}>                

                  <Stack direction="row"  spacing={2}>

                    <Image class="vehicle-img" src={"/images/profile/map.png"} alt="img" width={100} height={70}/> 

                  </Stack>
                  
                  <Stack direction="row" spacing={2}>
                    <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.09993 4.56793C3.19688 4.56793 4.09439 3.67904 4.09439 2.59262C4.09439 1.5062 3.19688 0.61731 2.09993 0.61731C1.00298 0.61731 0.105469 1.5062 0.105469 2.59262C0.105469 3.67904 1.00298 4.56793 2.09993 4.56793ZM2.09993 6.54324C1.00298 6.54324 0.105469 7.43212 0.105469 8.51854C0.105469 9.60496 1.00298 10.4939 2.09993 10.4939C3.19688 10.4939 4.09439 9.60496 4.09439 8.51854C4.09439 7.43212 3.19688 6.54324 2.09993 6.54324ZM0.105469 14.4445C0.105469 13.3581 1.00298 12.4692 2.09993 12.4692C3.19688 12.4692 4.09439 13.3581 4.09439 14.4445C4.09439 15.5309 3.19688 16.4198 2.09993 16.4198C1.00298 16.4198 0.105469 15.5309 0.105469 14.4445Z" fill="#202022"/>
                    </svg>
                  </Stack>

                </Stack>

              </Stack>              
              </Box>

              
            </CardContent>


            <CardContent class="card-flex green">

            <Box class="header-card"> 
              <Stack direction="row"  spacing={2} alignItems="center" justifyContent="space-between">
              
              
                <Stack  direction="row" spacing={2} alignItems="center" style={{width: '60%'}}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar class="avatar" src="/images/profile/user-1.jpg" alt="" />
                    <Box>
                      <Typography variant="h6">CARLOS LOAIZA</Typography>
                      <Typography variant="p">
                        UDS 837
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" style={{width: '40%'}}>                

                  <Stack direction="row"  spacing={2}>

                    <Image class="vehicle-img" src={"/images/profile/map.png"} alt="img" width={100} height={70}/> 

                  </Stack>
                  
                  <Stack direction="row" spacing={2}>
                    <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.09993 4.56793C3.19688 4.56793 4.09439 3.67904 4.09439 2.59262C4.09439 1.5062 3.19688 0.61731 2.09993 0.61731C1.00298 0.61731 0.105469 1.5062 0.105469 2.59262C0.105469 3.67904 1.00298 4.56793 2.09993 4.56793ZM2.09993 6.54324C1.00298 6.54324 0.105469 7.43212 0.105469 8.51854C0.105469 9.60496 1.00298 10.4939 2.09993 10.4939C3.19688 10.4939 4.09439 9.60496 4.09439 8.51854C4.09439 7.43212 3.19688 6.54324 2.09993 6.54324ZM0.105469 14.4445C0.105469 13.3581 1.00298 12.4692 2.09993 12.4692C3.19688 12.4692 4.09439 13.3581 4.09439 14.4445C4.09439 15.5309 3.19688 16.4198 2.09993 16.4198C1.00298 16.4198 0.105469 15.5309 0.105469 14.4445Z" fill="#202022"/>
                    </svg>
                  </Stack>

                </Stack>

              </Stack>              
              </Box>

              
            </CardContent>


          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default FollowerCard;
