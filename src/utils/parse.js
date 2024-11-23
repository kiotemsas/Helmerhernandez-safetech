// parse.js
import Parse from 'parse';

// Initialize Parse
Parse.initialize('NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR', '1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ');

Parse.serverURL = 'http://3.137.134.27:8080/parse';

const headers = {
    'X-Parse-Application-Id': 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',
    'X-Parse-REST-API-Key': '1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ',
    'Content-Type': 'application/json'
  };
  
  export const fetchFromParse = async (url, method, body) => {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    });
    return response.json();
  };
  
  export const saveVehicle = async (vehicleData) => {
    return await fetchFromParse('wss://parseapi.back4app.com/functions/saveVehicle', 'POST', vehicleData);
  };
  
  export const editVehicle = async (vehicleData) => {
    return await fetchFromParse('wss://parseapi.back4app.com/functions/editVehicle', 'POST', vehicleData);
  };
  
  export const deleteVehicle = async (vehicleId) => {
    return await fetchFromParse('wss://parseapi.back4app.com/functions/deleteVehicle', 'POST', { id: vehicleId });
  };
  
  export const getVehiclesByVendor = async (vendorId) => {
    return await fetchFromParse('wss://parseapi.back4app.com/functions/getVehiclesByVendor', 'POST', { vendor: vendorId });
  };
  
export default Parse;