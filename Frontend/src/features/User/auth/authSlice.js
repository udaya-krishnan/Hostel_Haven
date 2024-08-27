import { createSlice } from '@reduxjs/toolkit';
import { login, googleRegister, editprofile,uploadphoto } from './authAction';

const initialState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const { data, token } = action.payload;
                state.token = token;
                state.user = data;
            })
            .addCase(googleRegister.fulfilled, (state, action) => {
                console.log(action.payload);
                const { user, token } = action.payload;
                state.token = token;
                state.user = user;
            })
            .addCase(editprofile.fulfilled,(state,action)=>{
                state.user=action.payload.userData;
            })
            .addCase(uploadphoto.fulfilled,(state,action)=>{
                console.log('success fully changed');
                state.user=action.payload.userData
            })
    },
});

export const { Logout } = authSlice.actions;

export default authSlice.reducer;
