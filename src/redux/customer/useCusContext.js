import { CusContext } from "./CusContextProvider";
import { useContext } from "react";

export const useCusContext = () => {
  const context = useContext(CusContext);

  if (!context) {
    console.log("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};