'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline} from '@react-google-maps/api';


import CustomOutlinedInput from '@/app/components/forms/theme-elements/CustomOutlinedInput';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { IconSearch } from '@tabler/icons-react'; 

import { FormControlLabel } from '@mui/material';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import { MapRoute } from "@/app/components/map/route";

import Parse from '../../../utils/parse';
import { Stack } from '@mui/system';
import { getVehicles } from '../../../utils/parse';
import { useSession } from 'next-auth/react';
import { Dialog,  
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, Popover, Typography, Button, Box, Grid, Avatar, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Image from 'next/image'; 
 
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
  const [dataMarkers, setData] = useState(() => []); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [map, setMap] = useState()
  const [infoMarker, setInfo] = useState(0);
  const [inputTitle, setInputTitle] = useState('');     

  const [openMainModal, setOpenMainModal] = React.useState(false);
  

  const handleClickOpenMainModal = () => {
    setOpenMainModal(true);
    setAnchorEl(null);
    map.setZoom(14);

  };

  const handleCloseMainModal = () => {
    setOpenMainModal(false);
  }; 

  const parseClient = new Parse.LiveQueryClient({
    applicationId: 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',
    serverURL: 'ws://3.137.134.27:8080/parse',
    javascriptKey: '1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ',
  });

  parseClient.open();
  const query = new Parse.Query('Event');
  const subscription = parseClient.subscribe(query);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [active, setActive] = useState(false)

  const [search, setSerach] = useState('');

  const filterRoutes = (rotr, cSearch) => {

    if (rotr.length >= 1)
      return rotr.filter((t) =>
        t.plateNumber.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()) || t.driver.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
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

    const date = new Date(data.lastUpdate); 
    let parts_date = date.toLocaleString('en-US').split(",");
    let firstWord = data.driver.substring(0, 1)

    data.firstWord = firstWord;   
    data.date = parts_date[0];
    data.time = parts_date[1];

    setInfo(data);     

    setActive(false)
    setInputTitle("");

    map.panTo({
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng)
    });

    map.setZoom(15);

    setTimeout(() => {
      setAnchorEl(e);
    }, 650);

  };

  
  useEffect(() => {

    const initialVehicles = async () => {
  
        subscription.on('open', () => {
          console.log('LiveQuery connection opened');        
        });

        const token = session.accessToken;
        const response = await getVehicles(token);         

        setData([]); 
        {
          response.result.map(async (key) => {

            {key.lastEventPosition && key.route !== null ?

              setData([
                ...dataMarkers,
                {
                      id: key.objectId,
                      lat: key.lastEventPosition.position.latitude,
                      lng: key.lastEventPosition.position.longitude,
                      ignition: key.lastEventPosition.position.attributes.ignition,
                      plateNumber: key.plateNumber,
                      driver: key.route.driver.name,
                      lastUpdate: key.lastEventPosition.device.lastUpdate,

                },
              ])

            : ""}
                
          })

        } 

    };

    initialVehicles();
    return () => {};

  }, []);


  useEffect(() => {
 
    subscription.on('create', async (index) => { 
      
      setData(dataMarkers.map(user =>
        user.id === index.attributes.vehicle.id ? { ...user,  lat: index.attributes.resultObject.position.latitude,
          lng: index.attributes.resultObject.position.longitude,
          ignition: index.attributes.resultObject.position.attributes.ignition} : user
      )); 
      

    });

    subscription.on('error', (error) => {
      console.error('LiveQuery error:', error);
    });

    return () => {
      subscription.unsubscribe();
      parseClient.close();
    };

}, [dataMarkers]);
 
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
                            primary={menu.driver}
                            secondary={menu?.plateNumber}
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
          mapId="8ooTi4y7" 
          key= "8ooTi4y7"
          onLoad={(map) => setMap(map)}
          mapContainerStyle={defaultMapContainerStyle}
          center={defaultMapCenter}
          zoom={defaultMapZoom}
          options={defaultMapOptions}
        > 


            {dataMarkers.map((dataMarker,index)=>
              {
                  if(index === 0){
                    map.panTo({
                      lat: parseFloat(dataMarkers[0].lat),
                      lng: parseFloat(dataMarkers[0].lng)
                    });
                  } 
                  
                  return (<>
                                    
                      {dataMarker.ignition ?

                              <Marker
                                key= {index}
                                position={{
                                  lat: parseFloat(dataMarker.lat),
                                  lng: parseFloat(dataMarker.lng),
                                }}
                                onClick={(e) => handleMapClick(e, dataMarker)}
                                options={{ icon: '/images/vehicleOn.webp' }}
                              />

                            :

                              <Marker
                                key= {index}
                                position={{
                                  lat: parseFloat(dataMarker.lat),
                                  lng: parseFloat(dataMarker.lng),
                                }}
                                onClick={(e) => handleMapClick(e, dataMarker)}
                                options={{ icon: '/images/vehicleOff.webp' }}
                              />


                      } 
      
                  </>)
              }
            )}

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
                        <path fillRule="evenodd" cliprule="evenodd" d="M2.09993 4.56793C3.19688 4.56793 4.09439 3.67904 4.09439 2.59262C4.09439 1.5062 3.19688 0.61731 2.09993 0.61731C1.00298 0.61731 0.105469 1.5062 0.105469 2.59262C0.105469 3.67904 1.00298 4.56793 2.09993 4.56793ZM2.09993 6.54324C1.00298 6.54324 0.105469 7.43212 0.105469 8.51854C0.105469 9.60496 1.00298 10.4939 2.09993 10.4939C3.19688 10.4939 4.09439 9.60496 4.09439 8.51854C4.09439 7.43212 3.19688 6.54324 2.09993 6.54324ZM0.105469 14.4445C0.105469 13.3581 1.00298 12.4692 2.09993 12.4692C3.19688 12.4692 4.09439 13.3581 4.09439 14.4445C4.09439 15.5309 3.19688 16.4198 2.09993 16.4198C1.00298 16.4198 0.105469 15.5309 0.105469 14.4445Z" fill="#202022" />
                      </svg>
                    </Typography>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box className="popcard">

                        <Grid spacing={1} container>

                          <Grid item lg={2} md={2} sm={2} >

                            <Box className="circle_avatar">
                              <Typography variant="h4">{infoMarker.firstWord}</Typography> 
                            </Box>

                          </Grid>

                          <Grid item lg={4} md={4} sm={4} >

                            <Box className="">
                              <Typography variant="h6">{infoMarker.driver}</Typography>
                              <Typography variant="p">{infoMarker.plateNumber}</Typography>
                            </Box>

                          </Grid>

                          <Grid item lg={4} md={4} sm={4} >

                            <Box>
                              <Typography variant="h6">{infoMarker.date}</Typography>
                              <Typography variant="p">{infoMarker.time}</Typography>
                            </Box>

                          </Grid>

                          <Grid item lg={2} md={2} sm={2} >

                              <Button className='btn-transparent' color="primary" fullWidth  onClick={handleClickOpenMainModal}>

                                <svg width="22" height="22" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M30.2222 3.8H24.5556V0H20.7778V3.8H13.2222V0H9.44444V3.8H3.77778C1.69433 3.8 0 5.5043 0 7.6L0 31C0 33.0957 1.69433 35 3.77778 35H30.2222C32.3057 35 34 33.0957 34 31V7.6C34 5.5043 32.3057 3.8 30.2222 3.8ZM3.77778 31V9.5H30.2222L30.226 31H3.77778Z" fill="#202022"/>
                                  <path d="M7.55556 13.3H26.4444V17.1H7.55556V13.3ZM7.55556 20.9H17V24.7H7.55556V20.9Z" fill="#202022"/>
                                </svg>

                              </Button>

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


        <Dialog
          className='dialog-form wipe np'
          open={openMainModal}     
          onClose={handleCloseMainModal}
          aria-describedby="alert-dialog-slide-description"
        >
        


        <DialogTitle variant="h4">{"HISTORIAL DE ACTIVIDAD"}</DialogTitle>
                      
            
          <DialogContent className='DialogContentTech'>

            <MapRoute plateNumber={infoMarker.plateNumber} id={infoMarker.id} />

          </DialogContent>

        </Dialog>


      </div>

    </>

);

};

export { MapComponent };
