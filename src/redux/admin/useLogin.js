import { useAdminContext } from "./useAdminContext";
import Cookie from "universal-cookie"
import { useNavigate } from "react-router-dom";
import CryptoJS from'crypto-js';

const SECRET = import.meta.env.SECRET;

export const useLogin = (email, password) => {
    const cookies = new Cookie();
    const { dispatch } = useAdminContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
      const accessToken = CryptoJS.AES.decrypt(
        password,
        email,
        SECRET
      );
    const admin = await fetch(`http://localhost:5000/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'token': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await admin.json();
    if (admin.ok) {
      // save the admin in local storage
      localStorage.setItem("admin", JSON.stringify(data));
      cookies.set("admin", JSON.stringify(data), {path: '/'});
      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      navigate('/admin')
    }
  };
  return { login };
};