import { useCusContext } from "./useCusContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { showAlert } from "../alert/alertReducer";
import { useState } from "react";

export const useRegister = () => {
   const { dispatch } = useCusContext();
   const dis = useDispatch();
   const navigate = useNavigate();
   const [isLoading, setLoading] = useState(false);

   const register = async (form) => {
      setLoading(true);
      const customer = await publicRequest
         .post(
            "/customer/register",
            { ...form },
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((res) => res)
         .catch(
            (error) =>
               setLoading(false) &&
               dis(
                  showAlert({
                     message: error.response.data.message,
                     type: "error",
                  })
               ) &&
               setTimeout(() => {
                  dis(showAlert());
               }, 1500)
         );
      console.log(customer);
      if (customer.status === 201) {
         // save the admin in local storage
         localStorage.setItem("customer", JSON.stringify(customer.data));
         // update the auth context
         dispatch({ type: "REGISTER", payload: customer.data });
         setLoading(false);
         dis(showAlert({ message: "Register success", type: "success" }));
         setTimeout(() => {
            navigate("/products");
         }, 1500);
      }
   };
   return { register, isLoading };
};
