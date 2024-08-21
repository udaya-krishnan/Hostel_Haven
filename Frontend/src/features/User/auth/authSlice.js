import {createSlice} from '@reduxjs/toolkit';
import { login ,googleRegister} from './authAction';
import { json } from 'react-router-dom';

const initialState={
    token:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null,
    user:localStorage.getItem("token") ? localStorage.getItem("token"): null
}



const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        Logout:(state)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.user = null;
            state.token = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            const {data,token}=action.payload
            
            localStorage.setItem("user",JSON.stringify(data))
            localStorage.setItem("token",JSON.stringify(token))

            state.token=token;
            state.user=data;
        })

        .addCase(googleRegister.fulfilled,(state,action)=>{
            console.log(action.payload);

            const {user,token}=action.payload

            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("token",JSON.stringify(token))

            state.token=token
            state.user=user;
        })
    }
})

export const {Logout}=authSlice.actions

export default authSlice.reducer;