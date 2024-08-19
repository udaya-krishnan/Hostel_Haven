import {createSlice} from '@reduxjs/toolkit';
import { login } from './authAction';

const initialState={
    token:localStorage.getItem("user")|null,
    user:localStorage.getItem("token")|null
}



const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            const {data,token}=action.payload
            
            localStorage.setItem("user",JSON.stringify(data))
            localStorage.setItem("token",JSON.stringify(token))

            state.token=token;
            state.user=data;
        })
    }
})

export default authSlice.reducer;