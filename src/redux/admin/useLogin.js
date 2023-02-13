import { useAdminContext } from "./useAdminContext";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { apiUrl } from "../../constans/app";
import { useState } from "react";

const SECRET = import.meta.env.SECRET;

export const useLogin = (email, password) => {
   const cookies = new Cookie();
   const { dispatch } = useAdminContext();
   const navigate = useNavigate();

   const [isLoading, setLoading] = useState(false);

   const login = async (email, password) => {
      setLoading(true);
      const accessToken = CryptoJS.AES.decrypt(password, email, SECRET);
      const response = await fetch(`${apiUrl}/admin/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            token: `Bearer ${accessToken}`,
         },
         body: JSON.stringify({ email, password }),
      });
      const admin = await response.json();

      if (response.ok) {
         // save the admin in local storage
         localStorage.setItem("admin", JSON.stringify(admin));
         cookies.set("admin", JSON.stringify(admin), { path: "/" });
         setLoading(false);
         // update the auth context
         dispatch({ type: "LOGIN", payload: admin });
         navigate("/admin");
      }
   };
   return { login, isLoading };
};
