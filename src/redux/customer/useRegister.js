import { useCusContext } from "./useCusContext";
import CryptoJS from'crypto-js';
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { showAlert } from "../alert/alertReducer";

const SECRET = import.meta.env.SECRET

export const useRegister = () => {
  const { dispatch } = useCusContext();
  const dis = useDispatch();
  const navigate = useNavigate();

  const register = async (form) => {
    const accessToken = CryptoJS.AES.decrypt(
      form.email,
      form.password,
      SECRET
    );
    const customer = await publicRequest.post('/customer/register', { ...form }, {
      headers: {
        'Content-Type' : "application/json",
        'token': `Bearer ${accessToken}`
      },
    })
    console.log(customer)
    if (customer.status === 200) {
      // save the admin in local storage
      localStorage.setItem("customer", JSON.stringify(customer.data));
      // update the auth context
      dispatch({ type: "REGISTER", payload: customer.data });
      dis(showAlert());

      setTimeout(() => {
        navigate('/products')
      },1500);
    }
  };
  return { register };
};