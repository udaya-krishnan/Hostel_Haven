import { createSlice } from "@reduxjs/toolkit";
import { verifyHostOtp ,editprofile,hostuploadphoto} from "./authAction";

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
        builder
        .addCase(verifyHostOtp.fulfilled, (state, action) => {
            console.log('extrareducer');
            console.log(action.payload); 

            state.hostToken = action.payload.token;
            state.host = action.payload.host;
        })
        .addCase(editprofile.fulfilled,(state,action)=>{
            state.host=action.payload.hostData;
        })
        .addCase(hostuploadphoto.fulfilled,(state,action)=>{
            console.log('success fully changed');
            state.host=action.payload.hostData
        })
    },
});

export const { HostLogout } = hostauthSlice.actions;

export default hostauthSlice.reducer;
