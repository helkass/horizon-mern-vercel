import axios from "axios";
import { apiUrl } from "./constans/app";

// middleware
const customer = JSON.parse(localStorage.getItem("customer"));
const admin = JSON.parse(localStorage.getItem("admin"));

const getToken = () => {
   let token = "";
   if (customer) {
      if (customer.accessToken !== null) {
         token = customer.accessToken;
      } else {
         token;
      }
   }
   if (admin) {
      token = admin.accessToken;
   }

   return token;
};

const token = getToken();

export const publicRequest = axios.create({
   baseURL: apiUrl,
});

export const authorizationRequest = axios.create({
   baseURL: apiUrl,
   headers: {
      token: `Bearer ${token}`,
   },
});
