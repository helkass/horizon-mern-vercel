import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import toggleReducer from "./toggleReducer";
import alertReducer from "./alert/alertReducer"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    toggle: toggleReducer,
    alert: alertReducer
  },
});