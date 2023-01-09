import { useAdminContext } from "./useAdminContext";
import Cookie from "universal-cookie";
import { redirect } from "react-router-dom";

//admin logout
export const useLogout = () => {
    const cookies = new Cookie();
    const { dispatch } = useAdminContext();
    const logout = () => {
    // remove state admin from storage
    localStorage.removeItem("admin");
    cookies.remove("admin");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    redirect('/')
  };
  return { logout };
};