import { createSlice } from "@reduxjs/toolkit";
import { verifyHostOtp } from "./authAction";

const initialState = {
    hostToken: null,
    host: null,
};

const hostauthSlice = createSlice({
    name: "hostAuth",
    initialState,
    reducers: {
        HostLogout: (state) => {
            state.host = null;
            state.hostToken = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifyHostOtp.fulfilled, (state, action) => {
            console.log('extrareducer');
            console.log(action.payload); 

            state.hostToken = action.payload.token;
            state.host = action.payload.host;
        });
    },
});

export const { HostLogout } = hostauthSlice.actions;

export default hostauthSlice.reducer;
