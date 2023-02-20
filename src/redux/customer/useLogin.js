import { useCusContext } from "./useCusContext";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { showAlert } from "../alert/alertReducer";
import { useDispatch } from "react-redux";

const SECRET = import.meta.env.SECRET;

export const useLogin = () => {
   const { dispatch } = useCusContext();
   const dis = useDispatch();
   const navigate = useNavigate();
   const login = async (email, password) => {
      const accessToken = CryptoJS.AES.decrypt(password, email, SECRET);
      const response = await publicRequest
         .post(
            "/customer/login",
            { email, password },
            {
               headers: {
                  "Content-Type": "application/json",
                  token: `Bearer ${accessToken}`,
               },
            }
         )
         .then((res) => res)
         .catch(
            (error) =>
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

      if (response.status === 200) {
         // save the admin in local storage
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
      }
   };
   return { login };
};
