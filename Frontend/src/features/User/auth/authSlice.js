import { createSlice } from '@reduxjs/toolkit';
import { login, googleRegister } from './authAction';

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
            });
    },
});

export const { Logout } = authSlice.actions;

export default authSlice.reducer;
