import axios from "axios";

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

const apiUrl = import.meta.env.NODE_ENV == "production" ? "https://worried-mite-school-uniform.cyclic.app/api" : "http://localhost:5000/api";

export const publicRequest = axios.create({
   baseURL: apiUrl
});

export const authorizationRequest = axios.create({
   baseURL: apiUrl,
   headers: {
      token: `Bearer ${token}`,
   },
});
