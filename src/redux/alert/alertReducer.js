import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: {
        status : false
    },
    error : false
}

export const AlertSlice =  createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state) => {
            state.alert.status = !state.alert.status;
        },
        showAlertError: (state) => {
            state.error = !state.error
        }
    }
})

export const { showAlert, showAlertError } = AlertSlice.actions;
export default AlertSlice.reducer;