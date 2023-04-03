import axios from "axios";
import {apiUrl} from "./constans/app";

// middleware
const customer = JSON.parse(localStorage.getItem("customer"))?.accessToken;
const admin = JSON.parse(localStorage.getItem("admin"))?.accessToken;

const getToken = () => {
   let token = "";
   if (customer) {
      if (customer !== null) {
         token = customer;
      } else {
         token;
      }
   }
   if (admin) {
      token = admin;
   }

   return token;
};

const token = getToken();


export const publicRequest = axios.create({
   baseURL: apiUrl
});

export const authorizationRequest = axios.create({
   baseURL: apiUrl,
   headers: {
      token: `Bearer ${token}`,
   },
});

