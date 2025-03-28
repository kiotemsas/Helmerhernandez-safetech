
'use client';


import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';




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



const GoogleMapComponent = () => {


    


    
  const containerStyle = {
    width: '100%',
    height: '400px'
  };


  const origin = {
    lat: 9.3044491,
    lng: -75.3928912
  };

  const destination = {
    lat: 9.3132995,
    lng: -75.4114728
  };

  const [directions, setDirections] = useState(null);
 


  const directionsCallback = (response) => {

    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        //const route = response.routes[0].legs[0];
        //setTravelTime(route.duration.text);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };



  return (

    <>

     
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
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

          {directions && (
            <DirectionsRenderer
              options={{
                polylineOptions: {
                  strokeColor: "#7B51D0", 
                  strokeOpacity: 1,
                  strokeWeight: 8
                },
                preserveViewport: true,
                directions: directions,
                markerOptions: {visible: false},
              
              }}
            />
          )}



        </GoogleMap>

    </>

  );
};
 