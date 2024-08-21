import AuthService from "../../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register=(name,email,password)=>async()=>{
    const data=await AuthService.register(name,email,password)
    return data
    
}

export const otpVerify=(otp)=>async()=>{
    const data=await AuthService.otpVerify(otp)
    return data
}




export const login =createAsyncThunk(
    'auth/login',
    async({email,password,toast},{rejectWithValue})=>{
        console.log(email,password,"thunk");
        const response=await AuthService.loginverify(email,password)
        console.log(response.data);
        
        if(response.data.message==="Email was wrong"){
            toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('user not found')
        }else if(response.data.message==="Password was wrong"){
            toast.error('Incorrect Password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue('incorrect')
        }else{
            return response.data
        }
    }
)


export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async () => {
      const response = await AuthService.resendOtp()
      return response.data;
    }
  );


  export const googleRegister =createAsyncThunk(
    'auth/googleRegister',
    async({data},{rejectWithValue})=>{
        const response=await AuthService.googleRegister(data)

        console.log(response,"in action");
        
        return response
    }
  )
