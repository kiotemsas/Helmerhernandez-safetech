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



//VEHICLE

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


export const getVehicles = async (token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVehicles',
    'POST',
    {},
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



//VENDOR

export const saveVendor = async (vendorData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/saveVendor',
    'POST',
    vendorData,
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


export const editVendor = async (vendorData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/editVendor',
    'POST',
    vendorData,
    token
  );
};


export const deleteVendor = async (vendorId, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/deleteVendor',
    'POST',
    { id: vendorId },
    token
  );
};


//USER


export const saveUser = async (UserData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/saveUser',
    'POST',
    UserData,
    token
  );
};

export const editUser= async (UserData, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/editUser',
    'POST',
    UserData,
    token
  );
};

export const deleteUser = async (userId, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/deleteUser',
    'POST',
    { id: userId },
    token
  );
};


export const getUser = async (token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getUsers',
    'POST',
    { role: "driver"},
    token
  );
};










//ROUTES


export const getRouteByVehicle = async (Id, status, type, startDate, endDate, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVehicleTrackingData',
    'POST',
    { 
      id : Id,
      status: status,
      type : type,
      startDate : startDate,
      endDate : endDate },
      token
  );
};


export const getVehicleTrackingDataByVendor = async (plateNumber, vendor, status, type, startDate, endDate, token) => {
  return await fetchFromParse(
    'http://3.137.134.27:8080/parse/functions/getVehicleTrackingDataByVendor',
    'POST',
    { 
      plateNumber : plateNumber,
      vendor: vendor,
      status: status,
      type : type,
      startDate : startDate,
      endDate : endDate },
      token
  );
};

















export default Parse;

