'use client';

import React, { useEffect, useState } from 'react';
import { MapProvider } from "@/store/providers/map-provider";
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';
import { getRouteByVehicle } from '@/utils/parse';
 
//Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '300px',
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

const MapRoute = () => {
 

  const { data: session } = useSession();
  const [map, setMap] = useState()
  
  const origin = {
    lat: 9.3044491,
    lng: -75.3928912
  };
  
  const destination = {
    lat: 9.3132995,
    lng: -75.4114728
  };
  
  const [directions, setDirections] = React.useState(null);
  const [travelTime, setTravelTime] = React.useState(null);
  let count = React.useRef(0);

  const directionsCallback = (response) => {
    if (response !== null && count.current < 1) {
      if (response.status === 'OK') {
        count.current += 1;
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
        console.log(response)
      } else {
        count.current = 0;
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };
  
  
  useEffect(() => {    

    const initialRoute = async () => { 

         
      
        const token = session.accessToken;
        const response = await getRouteByVehicle("RNOFmzQyjx", token);         
        console.log(response)

    };

    initialRoute();


    return () => {};

  }, []);




  const handleSteps = (step) => {
 
    switch (step) {

      case 1:
        return (  <> 
        
        <Box className="BoxEnterTech">

          <Box className="BoxInsideTech">

              <Typography variant="h5">Quieres exportar el historial del vehiculo</Typography>
              <Typography variant="h4">(UDS 837) FECHA: DD/MM/AA</Typography>


              <Box className="muitech-confirm">

                <Button
                  color="primary"
                  variant="alone"
                  size="large"
                  fullWidth
                  component={Link}
                  href="/"
                  onClick={handleClickOpen}
                >
                    CERRAR
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={saveIt}> 

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
    

                  <GoogleMap
                    mapId="O86u6roz"
                    onLoad={(map) => setMap(map)}
                    mapContainerStyle={defaultMapContainerStyle}
                    center={defaultMapCenter}
                    zoom={defaultMapZoom}
                    options={defaultMapOptions}
                  >
             

                    <Marker position={origin} 
                      options={
                        { 
                          icon: '/images/vehicleInit.webp', 
                        }
                      }
                    />
    
                    <Marker position={destination} 
                        options={
                          { 
                            icon: '/images/vehicleEnd.webp'
                          }
                        }
                    />
    
                    <DirectionsService
                      options={{
                        destination: destination,
                        origin: origin,
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
                          directions: directions,
                          markerOptions: {visible: false},
                          optimizeWaypoints: true,
                          preserveViewport: false,
                        
                        }}
                      />
                    )}
    
    
    
                  </GoogleMap>

    </>

);

};

export { MapRoute };
