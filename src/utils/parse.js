// parse.js
import Parse from 'parse';

// Initialize Parse
Parse.initialize('NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR', '1MoUVm7jZKt9RR1t1THGN64LQOI7GUu5gvTnQlwZ');

Parse.serverURL = 'http://3.137.134.27:8080/parse';

const headers = {
  'X-Parse-Application-Id': 'NDIFx8hdu3ZLZbB6tUq3au06HmqrhuKkEZ72EVwR',
  'X-Parse-REST-API-Key': 'deWxXGwOYr6ena7rovZkoLgrDtZhaw9w3cFsA4s1',
  'Content-Type': 'application/json',
};

const fetchFromParse = async (url, method, data, token) => {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      'X-Parse-Session-Token': token, 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en la solicitud');
  }
  
  return await response.json();
};

export const saveVehicle = async (vehicleData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/saveVehicle',
    'POST',
    vehicleData,
    token
  );
};

export const editVehicle = async (vehicleData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/editVehicle',
    'POST',
    vehicleData,
    token
  );
};

export const deleteVehicle = async (vehicleId, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/deleteVehicle',
    'POST',
    { id: vehicleId },
    token
  );
};

export const getVehiclesByVendor = async (vendorId, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVehiclesByVendor',
    'POST',
    { vendor: vendorId },
    token
  );
};

export const getVehicles = async (token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVehicles',
    'POST',
    {},
    token
  );
};

export const getVendors = async (token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVendors',
    'POST',
    {},
    token
  );
};

export default Parse;

