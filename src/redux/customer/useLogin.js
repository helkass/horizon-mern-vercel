import { useCusContext } from "./useCusContext";
import CryptoJS from'crypto-js';
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { showAlert, showAlertError } from "../alert/alertReducer";
import { useDispatch } from "react-redux";

const SECRET = import.meta.env.SECRET;

export const useLogin = () => {
  const { dispatch } = useCusContext();
  const dis = useDispatch();
  const navigate = useNavigate();
  const login = async (email, password) => {
    const accessToken = CryptoJS.AES.decrypt(
      password,
      email,
      SECRET
    );
    const customer = await publicRequest.post('/customer/login', { email, password }, {
      headers: {
        'Content-Type' : "application/json",
        'token': `Bearer ${accessToken}`
      },
    })

    if (customer.status === 200) {
      // save the admin in local storage
      localStorage.setItem("customer", JSON.stringify(customer.data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: customer.data });
      // set true
      dis(showAlert());

      setTimeout(() => {
        //set false again
        dis(showAlert());
        navigate('/products')
      },1500);
    }

  };
  return { login };
};