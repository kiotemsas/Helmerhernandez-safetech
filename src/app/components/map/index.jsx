/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; //Map component Component from library
import Parse from '../../../utils/parse';
import { getVehicles }  from '../../../utils/parse';
import { useSession } from 'next-auth/react';
import { Popover, Box, Typography } from '@mui/material';

const parseClient = new Parse.LiveQueryClient({
  applicationId: 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',

  serverURL: 'ws://3.137.134.27:8080/parse', // Asegúrate de usar 'wss://' para conexiones seguras

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const {data: session } = useSession();
  const [data, _setData] = React.useState(() => []);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => { 
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleMapClick = (e) => { 
    alert("")
  };

  const onMarkerPress = (index) => {
    console.log("Marker : ", index)
  
  };

  useEffect(() => {



    const fetchVehicles = async () => {



              try {
                if (session) {

                  const token = session.accessToken;
                  const response = await getVehicles(token);



                  {response.result.map((key) => {
                    setEvents([
                      {
                        id: key.objectId,
                        lat: key.lastEventPosition.position.latitude,
                        lng: key.lastEventPosition.position.longitude,
                        ignition: key.lastEventPosition.position.attributes.ignition
                      },
                    ]) 

                  })}

                  console.log(events);
 
 
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

    subscription.on('create', (event) => {

      setEvents([
        {
          id: event.id,
          lat: event.attributes.resultObject.position.latitude,
          lng: event.attributes.resultObject.position.longitude,
          ignition: event.attributes.resultObject.position.attributes.ignition
        },
      ]);

      console.log(events);

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
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}       
      > 

        {events.map((event) => {
           
          return ( 

            <> 

              {event.ignition ?  

                  <Marker
                      key={event.id}
                      position={{
                        lat: parseFloat(event.lat),
                        lng: parseFloat(event.lng),
                      }}
                      onClick={(e) => handleMapClick(e)}
                      options={{ icon: '/images/svgs/vehicleOn.svg' }}
                  />

              : 

                  <Marker
                    key={event.id}
                    position={{
                      lat: parseFloat(event.lat),
                      lng: parseFloat(event.lng),
                    }}
                    onClick={(e) => handleMapClick(e)}
                    options={{ icon: '/images/svgs/vehicleOff.svg' }}
                  /> 

              }
 
            </>
 
          );
          
        })}

        
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
