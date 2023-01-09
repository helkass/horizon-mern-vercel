import { useCusContext } from "./useCusContext";

export const useLogout = () => {
  const { dispatch } = useCusContext();
  const logout = () => {
    // remove state customer from storage
    localStorage.removeItem("customer");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};