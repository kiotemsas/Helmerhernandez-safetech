/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; //Map component Component from library
import Parse from 'parse ';

const parseClient = new Parse.LiveQueryClient({
  applicationId: 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',
  serverURL: 'wss://safetech.b4a.io', // Asegúrate de usar 'wss://' para conexiones seguras
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
const defaultMapZoom = 17;

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

  useEffect(() => {
    const query = new Parse.Query('Event');
    const subscription = parseClient.subscribe(query);

    subscription.on('open', () => {
      console.log('LiveQuery connection opened');
    });

    subscription.on('create', (event) => {
      console.log('New event:', event);
      if (event.attributes.type === 'commandResult') {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: event.id,
            lat: event.attributes.latitude,
            lng: event.attributes.longitude,
          },
        ]);
      }
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
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.lat, lng: event.lng }}
            options={{ icon: '/images/svgs/marker.svg' }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };