import { useCusContext } from "./useCusContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { showAlert } from "../alert/alertReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useLogin = () => {
   const { dispatch } = useCusContext();
   const dis = useDispatch();
   const navigate = useNavigate();
   const [isLoading, setLoading] = useState(false);

   const login = async (email, password) => {
      setLoading(true);
      await publicRequest
         .post(
            "/customer/login",
            { email, password },
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((res) => {
            setLoading(false);
            dis(showAlert({ message: "login success", type: "success" }));
            // save the admin in local storage
            localStorage.setItem("customer", JSON.stringify(res.data));
            // update the auth context
            dispatch({ type: "LOGIN", payload: res.data });
            // set true

            setTimeout(() => {
               //set false again
               dis(showAlert());
               navigate("/products");
            }, 1500);
         })
         .catch((err) => {
            setLoading(false);
            dis(
               showAlert({
                  message: err.response.data.message,
                  type: "error",
               })
            );
            setTimeout(() => {
               //set false again
               dis(showAlert());
            }, 1500);
         });

      setTimeout(() => {
         dis(showAlert());
      }, 1500);
   };
   return { login, isLoading };
};
