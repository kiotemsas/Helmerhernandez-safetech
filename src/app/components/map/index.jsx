'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import CustomOutlinedInput from '@/app/components/forms/theme-elements/CustomOutlinedInput';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { IconSearch } from '@tabler/icons-react'; 

import { FormControlLabel } from '@mui/material';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';

import Parse from '../../../utils/parse';
import { Stack } from '@mui/system';
import { getVehicles } from '../../../utils/parse';
import { useSession } from 'next-auth/react';
import { Popover, Typography, Button, Box, Grid, Avatar, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Image from 'next/image';


const parseClient = new Parse.LiveQueryClient({
  applicationId: 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',
  serverURL: 'ws://3.137.134.27:8080/parse',
  javascriptKey: '1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ',
});
parseClient.open();

//Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

//K2's coordinates
const defaultMapCenter = {
  lat: 9.3023769,
  lng: -75.3994999,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 14;

//Map options
const defaultMapOptions = {
  zoomControl: false,
  tilt: 0,
  mapTypeControl: false,
  zoomControl: false,
  //scrollwheel: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'auto',
  mapTypeId: 'roadmap',
  styles: [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [{ invert_lightness: true }],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ hue: '#00BBC9' }],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ hue: '#00BBC9' }],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ hue: '#00BBC9' }],
    },
  ],
};

const MapComponent = () => {

  const { data: session } = useSession();
  const [dataMarkers, setData] = React.useState(() => []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [map, setMap] = useState()
  const [infoMarker, setInfo] = React.useState(0);
  const [inputTitle, setInputTitle] = useState('');

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [active, setActive] = useState(false)

  const [search, setSerach] = useState('');

  const filterRoutes = (rotr, cSearch) => {

    if (rotr.length >= 1)
      return rotr.filter((t) =>
        t.plateNumber.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()) || t.brand.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
      );

    return rotr;
  };

  const searchData = filterRoutes(dataMarkers, search);

  const onChange = (e) => {

    setInputTitle(e.target.value);
    setSerach(e.target.value)
    {
      e.target.value === '' && search !== null ?
        setActive(false)
      :
        setActive(true)
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
    map.setZoom(14);
  };

  const handleMapClick = (e, data) => {

    setInfo(data);
    setActive(false)
    setInputTitle("");

    map.panTo({
      lat: data.lat,
      lng: data.lng,
    });

    map.setZoom(15);

    setTimeout(() => {
      setAnchorEl(e);
    }, 650);

  };

  useEffect(() => {

    const fetchVehicles = async () => {

      try {
        if (session) {

          const token = session.accessToken;
          const response = await getVehicles(token);


          {
            response.result.map((key) => {
              setData([
                {
                  id: key.objectId,
                  lat: key.lastEventPosition.position.latitude,
                  lng: key.lastEventPosition.position.longitude,
                  ignition: key.lastEventPosition.position.attributes.ignition,
                  plateNumber: key.plateNumber,
                  brand: key.brand,
                },
              ])

            })
          }

        } else {
          alert('No se ha encontrado una sesión activa.');
        }
      } catch (error) {

      } finally {
        //setLoading(false);
      }
    };

    fetchVehicles();


    const query = new Parse.Query('Event');
    const subscription = parseClient.subscribe(query);

    subscription.on('open', () => {
      console.log('LiveQuery connection opened');
    });

    subscription.on('create', (index) => {


      //console.log(index.attributes);

      setData([
        {
          id: index.id,
          lat: index.attributes.resultObject.position.latitude,
          lng: index.attributes.resultObject.position.longitude,
          ignition: index.attributes.resultObject.position.attributes.ignition,
          plateNumber: index.attributes.resultObject.device.model,
          brand: index.attributes.resultObject.device.contact,
        },
      ]);


      setAnchorEl(null);

    });

    subscription.on('error', (error) => {
      console.error('LiveQuery error:', error);
    });

    return () => {
      subscription.unsubscribe();
      parseClient.close();
    };
  }, []);

  return (

    <>

      <Stack className="header-tech" position="sticky" color="default" flexGrow={1} spacing={1} direction="row" alignItems="center">

        <Box
          className="safetechcheck"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
          }}
        >
          <FormControlLabel
            value="start"
            control={<CustomCheckbox color="primary" />}
            label={
              <>
                <img src="images/svgs/icon-carperson.svg" className="profile-img" width="80px" height="auto" style={{ marginRight: "5px" }} />
              </>
            }
            labelPlacement="start"
          />


        </Box>

        <Box
          className="safetechcheck"
          alignItems="center"
          justifyContent="center"
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
          }}
        >
          <FormControlLabel
            value="start"
            control={<CustomCheckbox color="primary" />}
            label={
              <>
                <img src="images/svgs/icon-map.svg" className="profile-img" width="33px" height="auto" style={{ marginRight: "5px" }} />
              </>
            }
            labelPlacement="start"
          />


        </Box>

        <Box
          className="searchtoptech"
          alignItems="center"
          justifyContent="center"
          style={{ marginLeft: "35px" }}
        >


          <CustomOutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconSearch size="16" />
              </InputAdornment>
            }
            value={inputTitle}
            onChange={(e) => onChange(e)}              
            placeholder="Driver or Plate text"
            fullWidth
          />


          {active && (


            <List component="nav">

              {searchData == ''
                ?
                <>
                  <Box>

                    <ListItemButton >
                      <ListItemText
                        primary="No hay registros"
                        secondary="SafeTech"
                      />
                    </ListItemButton>

                  </Box>
                </>
                :
                <>
                  {searchData.map((menu) => {
                    return (
                      <Box key={menu.id}>

                        <ListItemButton
                          onClick={(e) => handleMapClick(e, menu)}
                          key={menu.plateNumber}
                        >
                          <ListItemText
                            primary={menu.plateNumber}
                            secondary={menu?.brand}
                          />
                        </ListItemButton>

                      </Box>
                    );
                  })}

                </>
              }






            </List>

          )


          }



        </Box>

      </Stack>

      <div className="w-full">

        <GoogleMap
          mapId={'bf51a910020fa25a'}
          onLoad={(map) => setMap(map)}
          mapContainerStyle={defaultMapContainerStyle}
          center={defaultMapCenter}
          zoom={defaultMapZoom}
          options={defaultMapOptions}
        >

          {dataMarkers.map((dataMarker) => {

            return (

              <>

                {dataMarker.ignition ?

                  <Marker
                    key={dataMarker.id}
                    position={{
                      lat: parseFloat(dataMarker.lat),
                      lng: parseFloat(dataMarker.lng),
                    }}
                    onClick={(e) => handleMapClick(e, dataMarker)}
                    options={{ icon: '/images/svgs/vehicleOn.svg' }}
                  />

                  :

                  <Marker
                    key={dataMarker.id}
                    position={{
                      lat: parseFloat(dataMarker.lat),
                      lng: parseFloat(dataMarker.lng),
                    }}
                    onClick={(e) => handleMapClick(e, dataMarker)}
                    options={{ icon: '/images/svgs/vehicleOff.svg' }}
                  />


                }

              </>

            );

          })}

          

        </GoogleMap>


        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            className='popoverCard'
          >

            


            <Accordion className='accordionRootModal'>
                <AccordionSummary
                    className='accordionModal'
                    expandIcon={ <Typography>
                      <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clip-rule="evenodd" d="M2.09993 4.56793C3.19688 4.56793 4.09439 3.67904 4.09439 2.59262C4.09439 1.5062 3.19688 0.61731 2.09993 0.61731C1.00298 0.61731 0.105469 1.5062 0.105469 2.59262C0.105469 3.67904 1.00298 4.56793 2.09993 4.56793ZM2.09993 6.54324C1.00298 6.54324 0.105469 7.43212 0.105469 8.51854C0.105469 9.60496 1.00298 10.4939 2.09993 10.4939C3.19688 10.4939 4.09439 9.60496 4.09439 8.51854C4.09439 7.43212 3.19688 6.54324 2.09993 6.54324ZM0.105469 14.4445C0.105469 13.3581 1.00298 12.4692 2.09993 12.4692C3.19688 12.4692 4.09439 13.3581 4.09439 14.4445C4.09439 15.5309 3.19688 16.4198 2.09993 16.4198C1.00298 16.4198 0.105469 15.5309 0.105469 14.4445Z" fill="#202022" />
                      </svg>
                    </Typography>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box className="popcard">

                        <Grid spacing={1} container>

                          <Grid item lg={3} md={3} sm={3} >

                            <Avatar className="avatar" src="/images/profile/user-1.jpg" alt="" />

                          </Grid>

                          <Grid item lg={5} md={5} sm={5} >

                            <Box>
                              <Typography variant="h6">{infoMarker.brand}</Typography>
                              <Typography variant="p">{infoMarker.plateNumber}</Typography>
                            </Box>

                          </Grid>

                          <Grid item lg={4} md={4} sm={4} >

                            <Image className="vehicle-img" src={"/images/profile/map.png"} alt="img" width={100} height={70} />

                          </Grid>

                        </Grid>

                    </Box>

                </AccordionSummary>

                <AccordionDetails className='card-flex'>
                    
                  <Box className="map-card">
                  <Image src={"/images/profile/map.png"} alt="img" width={400} height={180} style={{width: '100%'}} />                    
                </Box>

              <Box className="body-card">
                <Typography variant="h6">RENAULT SANDERO</Typography>
                <Typography variant="h5">ROUTE #3</Typography>   
                <Typography variant="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </Typography>            
              </Box>

              <Box className="group-btn-card">
                <Button className="lineal" onClick={handleClose} variant="contained" color="primary">
                  CLOSE
                </Button>
                <Button variant="contained" color="primary">
                  OPTION
                </Button>           
              </Box>


                </AccordionDetails>



            </Accordion>

        </Popover>


      </div>

    </>

  );
};

export { MapComponent };
