import { createSlice } from "@reduxjs/toolkit";
import { verifyHostOtp } from "./authAction";

const initialState = {
    hostToken: localStorage.getItem("hostToken") ? JSON.parse(localStorage.getItem("hostToken")) : null,
    host: localStorage.getItem("host") ? JSON.parse(localStorage.getItem("host")) : null,
};

const hostauthSlice = createSlice({
    name: "hostAuth",
    initialState,
    reducers: {
        HostLogout:(state)=>{
            localStorage.removeItem("hostToken")
            localStorage.removeItem("host")

            state.host=null
            state.hostToken=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyHostOtp.fulfilled, (state, action) => {
                console.log('extrareducer');
                console.log(action.payload); 

                state.hostToken = action.payload.token;
                state.host = action.payload.host;

                localStorage.setItem("host", JSON.stringify(action.payload.host));
                localStorage.setItem("hostToken", JSON.stringify(action.payload.token));
            });
    },
});

export const {HostLogout}=hostauthSlice.actions

export default hostauthSlice.reducer;
