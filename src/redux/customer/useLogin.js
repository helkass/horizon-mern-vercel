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
            // save the admin in local storage
            setLoading(false);
            localStorage.setItem("customer", JSON.stringify(response.data));
            // update the auth context
            dispatch({ type: "LOGIN", payload: response.data });
            // set true
            dis(showAlert({ message: "login success", type: "success" }));

            setTimeout(() => {
               //set false again
               dis(showAlert());
               navigate("/products");
            }, 1500);
         })
         .catch((err) =>
            dis(
               showAlert({
                  message: err.message,
                  type: "error",
               })
            )
         );
      setLoading(false);

      setTimeout(() => {
         dis(showAlert());
      }, 1500);
   };
   return { login, isLoading };
};
