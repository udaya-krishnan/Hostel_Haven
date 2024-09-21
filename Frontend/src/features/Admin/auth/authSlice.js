import { createSlice } from "@reduxjs/toolkit";
import { loginadmin } from "./authAction";

const initialState = {
    adminToken: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        Logout: (state) => {
            state.adminToken = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginadmin.fulfilled, (state, action) => {
            console.log("extra reducer");
            console.log(action.payload);
            
            state.adminToken = action.payload.token;
        });
    },
});

export const { Logout } = adminSlice.actions;

export default adminSlice.reducer;
