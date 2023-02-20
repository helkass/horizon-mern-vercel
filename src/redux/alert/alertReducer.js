import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   status: false,
   message: "",
   type: "",
};

export const AlertSlice = createSlice({
   name: "alert",
   initialState,
   reducers: {
      showAlert: (state, action) => {
         state.status = !state.status;
         // set message;
         const temp = action?.payload;
         state.message = temp?.message;
         state.type = temp?.type;
      },
   },
});

export const { showAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
