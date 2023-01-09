import { useCusContext } from "./useCusContext";
import CryptoJS from'crypto-js';
import { useNavigate } from "react-router-dom";


const SECRET = import.meta.env.SECRET
export const useLogin = () => {
  const { dispatch } = useCusContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    const accessToken = CryptoJS.AES.decrypt(
      password,
      email,
      SECRET
    );
    const customer = await fetch('http://localhost:5000/api/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type' : "application/json",
        'token': `Bearer ${accessToken}`
      },
      body: JSON.stringify({email, password})
    })
    const data = await customer.json();
    if (customer.status === 200) {
      // save the admin in local storage
      localStorage.setItem("customer", JSON.stringify(data));
    //   setCookie("customer", JSON.stringify(data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      navigate('/products')
    }
  };
  return { login };
};