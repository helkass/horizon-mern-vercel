import { AdminContext } from "./AdminContext";
import { useContext } from "react";

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) {
    console.log("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};