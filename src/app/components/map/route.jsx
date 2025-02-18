'use client';

import React, { useEffect, useState } from 'react'; 
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSession } from 'next-auth/react'; 
import Link from 'next/link';
 
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { DateTimePicker, DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import ReplayRounded from '@mui/icons-material/ReplayRounded';
import Close from '@mui/icons-material/Close';
import CircularProgress from "@mui/material/CircularProgress";

import { Typography, Stepper, Button,  Box, Grid, } from '@mui/material';

import { getRouteByVehicle } from '../../../utils/parse';

//Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
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

const MapRoute = ({ id,plateNumber}) => {
 
  const { data: session } = useSession();
  const [map, setMapG] = useState()

  const [activeStep, setActiveStep] = React.useState(0);
  const isStepOptional = (step) => step === 1;
  const steps = ['Create', 'Confirm'];

  const [valueFI, setValueFI] = React.useState(new Date("2025-02-09 00:00:00"));
  const [valueFF, setValueFF] = React.useState(new Date("2025-02-10 00:00:00"));  
  
  const [directions, setDirections] = useState(null); 
  const [travelTime, setTravelTime] = React.useState(null);
  let count = React.useRef(0);
  const [openExport, setOpenExport] = React.useState(false); 


  const [dataTrack, setDataTrack] = useState([]); 
  const [waypoints, setWayPoints] = useState([]); 

  const [origen, setOrigen] = React.useState([]);
  const [destination, setDestination] = React.useState([]);  

  
  useEffect(() => {  

      const initialVehicles = async () => {
       
        const token = session.accessToken;
        const response = await getRouteByVehicle( id, "active", "position", valueFI.toISOString(),  valueFF.toISOString(), token);  
        
        setDataTrack(response.result.trackingHistory.map((key) => (
            { 
              location: { lat: key.position.latitude, lng: key.position.longitude },
              stopover: true,
              device: key.device.name,
              contact: key.device.contact,
              lastupdate: key.device.lastUpdate,
            }
        ))); 
        
        setDestination({ lat: response.result.trackingHistory[0].position.latitude, lng: response.result.trackingHistory[0].position.longitude })
        setOrigen({ lat: response.result.trackingHistory[response.result.trackingHistory.length-1].position.latitude, lng: response.result.trackingHistory[response.result.trackingHistory.length-1].position.longitude })

      };

      initialVehicles();
      
            
      return () => {};

  }, [!dataTrack]);


 
  const directionsCallback = (response) => {
  
    if (destination !== null && origen !== null && response !== null && count.current < 1) {
      if (response.status === 'OK') { 
        count.current += 1;
        console.log(response)
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
        setWayPoints(response.routes[0].overview_path)
      } else {
        count.current = 0;
        console.error('Directions request failed due to ' + response.status);
      }
    }

    
  };


  const handleDownload = () => {
    const headers = ["Users", "Contacto", "Last Update", "Latitude", "Longitude"];
    const rows = dataTrack.map(item => [

        item.device,
        item.contact,
        item.lastUpdate,
        item.location.lat,
        item.location.lng,
        
    ]);


    const csvContent = [
        headers.join(","),
        ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Historial-SafeTech.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
};


  const rePaintMap = () => {
    count.current = 0;
    setWayPoints([]);                             
    setDirections(null);   
    setDataTrack(null);  
    setDestination(null); 
    setOrigen(null); 
 
  };

  const continuar = async (e) => {  
    
    e.preventDefault(); 
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  }
  
  const cerrar = () => {
    setOpenExport(true);
    setActiveStep(0);
  };

  const handleSteps = (step) => {
  
    switch (step) {

      case 1:
        return (  <> 
        
        <Box className="BoxEnterTech">

          <Box className="BoxInsideTech">

              <Typography variant="h5">Quieres exportar el historial del vehiculo</Typography>
              <Typography variant="h4">{plateNumber}</Typography>


              <Box className="muitech-confirm">

                <Button
                  color="primary"
                  variant="alone"
                  size="large"
                  fullWidth
                  component={Link}
                  href="/"
                  onClick={cerrar}
                >
                    CERRAR
                </Button>
                
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleDownload}> 

                  EXPORTAR

                </Button>

              </Box>

          </Box>

        </Box>

        </> );


  

      default:
        break;
    }
  };

  return (
    <>  

    <Box width="100%">

        <Grid spacing={1} container>

          <Grid item lg={5} md={3} sm={3} >

            <Box className="muitech">

                <CustomFormLabel className="nametech" htmlFor="phone">FECHA Y HORA INICIAL</CustomFormLabel>

                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DateTimePicker className='DatePickerTech'
                        renderInput={(props) => (
                          
                            <CustomTextField
                                {...props}
                                fullWidth
                                size="small"
                                
                            />
                        )} 
                        value={valueFI}
                        onChange={(newValue) =>   { 
                          setValueFI(newValue);                             
                        }} 
                    />

                </LocalizationProvider>

            </Box>

          </Grid>

          <Grid item lg={5} md={3} sm={3} >

            <Box className="muitech">

              <CustomFormLabel className="nametech" htmlFor="address">FECHA Y HORA FINAL</CustomFormLabel>

              <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DateTimePicker className='DatePickerTech'
                        renderInput={(props) => (
                          
                            <CustomTextField
                                {...props}
                                fullWidth
                                size="small"
                                
                            />
                        )} 
                        value={valueFF}
                        onChange={(newValue) => {
                          alert(newValue)
                          setValueFF(newValue);
                        }}
                    />

              </LocalizationProvider>

            </Box>

          </Grid>

          <Grid item lg={2} md={2} sm={2} > 

              <Button className='roundButton info' onClick={() => rePaintMap()} color="primary">
                <ReplayRounded />
              </Button>

              <Button className='roundButton clean'cece color="primary">
                <Close/>
              </Button>

          </Grid>


        </Grid>

    </Box>

    <Box className="map-card">
           
      <GoogleMap
              mapId="O86u6roz"
              onLoad={(map) => setMapG(map)}
              mapContainerStyle={defaultMapContainerStyle}
              center={defaultMapCenter}
              zoom={defaultMapZoom}
              options={defaultMapOptions}>



                <Marker 
                  key={1}                          
                  position={ origen} 
                  options={
                    { 
                      icon: '/images/vehicleInit.webp', 
                    }
                  }
                />


                <Marker 
                  key={2}                          
                  position={ destination} 
                  options={
                    { 
                      icon: '/images/vehicleEnd.webp', 
                    }
                  }
                />

         {
             /*       
            waypoints.map((waypoint, index)=>
            { 
              return (
              
                <Marker 
                  key={index}                          
                  position={ waypoint} 
                  options={
                    { 
                      icon: '/images/vehicleInit.webp', 
                    }
                  }
                />

                             
              )                           
                          
            }

          )*/}
                
              
        
              <DirectionsService
                options={{
                    destination: destination,
                    origin: origen,
                    //waypoints: dataTrack,
                    optimizeWaypoints: true, 
                    travelMode: 'DRIVING'                    
                }} 
                callback={(e) => directionsCallback(e)}

              />
   

            {directions !== null  && (
                
                <DirectionsRenderer
                  options={{
                    polylineOptions: {
                      strokeColor: "#7B51D0", 
                      strokeOpacity: 1,
                      strokeWeight: 8
                    },  
                    suppressMarkers : true,
                    optimizeWaypoints: true, 
                    directions: directions, 
                    preserveViewport: false,
                              
                  }}
                />

            )}          
          
      </GoogleMap> 

    </Box>

    <Box className="muitech-confirm np">
                
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={continuar}> 
                
                        CONTINUAR
                
                    </Button>
                
    </Box>


    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = <Typography variant="caption">Optional</Typography>;
        }
      })}
    </Stepper>  

    {activeStep === steps.length ? (            
      <>
            
          <Box className="BoxEnterTech">
            
                              <Box className="BoxInsideTech">
            
                                  <Typography variant="h5">Historial exportado con exito.</Typography>
                                  
                                  <svg width="160" height="153" viewBox="0 0 160 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_dd_601_634)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M107.903 65.1666H114.021C114.394 67.3889 114.588 69.6718 114.588 72C114.588 74.7382 114.32 77.4137 113.808 80.0016L107.922 78.8372L102.036 77.6728C102.397 75.8477 102.588 73.9521 102.588 72C102.588 70.0479 102.397 68.1523 102.036 66.3272L107.903 65.1666ZM73.5884 31C76.3266 31 79.0021 31.2684 81.59 31.7804L80.4256 37.6663L79.2612 43.5523C77.4361 43.1912 75.5405 43 73.5884 43C71.6362 43 69.7407 43.1912 67.9156 43.5523L66.7512 37.6663L65.5867 31.7804C68.1747 31.2684 70.8502 31 73.5884 31ZM54.1461 42.8916L50.8081 37.9058C46.337 40.8991 42.4875 44.7486 39.4942 49.2197L44.48 52.5577L49.4658 55.8956C51.5865 52.7279 54.3163 49.9981 57.484 47.8774L54.1461 42.8916ZM32.5884 72C32.5884 69.2618 32.8568 66.5863 33.3688 63.9984L39.2547 65.1628L45.1406 66.3272C44.7796 68.1523 44.5884 70.0479 44.5884 72C44.5884 73.9521 44.7796 75.8477 45.1406 77.6728L39.2547 78.8372L33.3688 80.0016C32.8568 77.4137 32.5884 74.7382 32.5884 72ZM44.48 91.4423L39.4942 94.7802C42.4875 99.2513 46.337 103.101 50.8081 106.094L54.146 101.108L57.484 96.1226C54.3163 94.0019 51.5865 91.2721 49.4658 88.1044L44.48 91.4423ZM66.7511 106.334L65.5867 112.22C68.1747 112.732 70.8502 113 73.5884 113C76.3266 113 79.0021 112.732 81.59 112.22L80.4256 106.334L79.2612 100.448C77.4361 100.809 75.5405 101 73.5884 101C71.6362 101 69.7406 100.809 67.9156 100.448L66.7511 106.334ZM93.0307 101.108L96.3686 106.094C100.84 103.101 104.689 99.2514 107.683 94.7803L102.697 91.4423L97.7109 88.1044C95.5902 91.2721 92.8605 94.0019 89.6928 96.1226L93.0307 101.108Z" fill="url(#paint0_linear_601_634)"/>
                                    </g>
                                    <g filter="url(#filter1_dd_601_634)">
                                    <path d="M56.7056 62.8983L73.186 79.2354L119.411 33.4119" stroke="url(#paint1_linear_601_634)" stroke-width="12" stroke-linecap="square"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_dd_601_634" x="0.588379" y="7" width="146" height="146" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="8"/>
                                    <feGaussianBlur stdDeviation="16"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_601_634"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
                                    <feBlend mode="normal" in2="effect1_dropShadow_601_634" result="effect2_dropShadow_601_634"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_601_634" result="shape"/>
                                    </filter>
                                    <filter id="filter1_dd_601_634" x="16.2202" y="0.926758" width="143.676" height="126.757" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="8"/>
                                    <feGaussianBlur stdDeviation="16"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_601_634"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
                                    <feBlend mode="normal" in2="effect1_dropShadow_601_634" result="effect2_dropShadow_601_634"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_601_634" result="shape"/>
                                    </filter>
                                    <linearGradient id="paint0_linear_601_634" x1="32.5884" y1="72" x2="114.233" y2="77.3848" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#593A97"/>
                                    <stop offset="1" stop-color="#E83E33"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_601_634" x1="56.7056" y1="56.3236" x2="118.905" y2="61.9373" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#593A97"/>
                                    <stop offset="1" stop-color="#E83E33"/>
                                    </linearGradient>
                                    </defs>
                                  </svg>
                              
                                  <Box className="muitech-confirm">
            
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      size="large"
                                      fullWidth
                                      onClick={cerrar}> 
            
                                      CONTINUAR
            
                                    </Button>
            
                                  </Box>
            
                              </Box>
            
            
          </Box> 
            
      </>
            
      ) : (
            
        <>
            
          {handleSteps(activeStep)}
            
        </>
            
      )}

    </>

);

};

export { MapRoute };
