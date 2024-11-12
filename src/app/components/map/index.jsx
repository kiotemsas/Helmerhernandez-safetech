/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh',
};

//K2's coordinates
const defaultMapCenter = {
    lat: 9.3023769,
    lng: -75.3994999
}


//Default zoom level, can be adjusted
const defaultMapZoom = 17

//Map options
const defaultMapOptions = {
    zoomControl: false,
    tilt: 0,
    mapTypeControl: false,
    zoomControl: false,
    mapTypeControl:false,
    scaleControl: false,
    streetViewControl:false,
    rotateControl:false,
    fullscreenControl:false,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { invert_lightness: true }
        ]
      },{
        featureType: "road",
        elementType: "all",
        stylers: [
          { hue: "#00BBC9" }
        ]
      },{
        featureType: "poi",
        elementType: "all",
        stylers: [
          { hue: "#00BBC9" }
        ]
      },{
        featureType: "water",
        elementType: "all",
        stylers: [
          { hue: "#00BBC9" }
        ]
      }]
};


const location = {
  lat: 9.3023769,
  lng: -75.3994999
};



const MapComponent = () => {
    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >

<Marker

options={{
  icon: '/images/svgs/marker.svg'
}}

position={location} />

            </GoogleMap>
        </div>
    )
};

export { MapComponent };