import geolib, { getDistance } from "geolib";

// current location of coffee horizon set default tambakboyo
let params = {
   latitude: 0,
   longitude: 0,
};

// Working with W3C Geolocation API
export const getCurrentPosition = () => {
   navigator.geolocation.getCurrentPosition(
      (position) => {
         //  set params for get distance
         // set point of two
         params["latitude"] = position.coords.latitude;
         params["longitude"] = position.coords.longitude;
      },
      () => {
         alert("Position could not be determined.");
      }
   );
};

// distance two points
export const distance = getDistance(
   {
      latitude: -6.8509427,
      longitude: 111.7912185,
   },
   { ...params }
);

export const calculateOrderShipping = () => {
   let shipping = 2000; //per km

   return () => {};
};
