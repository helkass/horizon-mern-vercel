import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import toggleReducer from "./toggleReducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    toggle: toggleReducer
  },
});