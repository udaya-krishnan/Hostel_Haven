import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import HostAuthService from "../../../services/HostAuthService"
import HostAccountService from "../../../services/HostAccountService";


export const hostLogin=(email, password, toast) => async (dispatch) => {
    try {
        const data = await HostAuthService.LoginHost(email, password)
        if (data.message === "Email was wrong") {
            toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        } else if (data.message === "Password was wrong") {
            toast.error('Incorrect password', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        }else if(data.message==="Account blocked"){
          toast.error('Account Blocked', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
        }else{
          dispatch({ type: 'LOGIN_SUCCESS', payload: data });  // This is an example

          return data.message;
        }

    } catch (error) {
        console.log(error.message);
        return null;  // or dispatch a failure action if needed
    }
};


export const verifyHostOtp=createAsyncThunk(
    'hostAuth/verifyHostOtp',
    async({otp,toast},{rejectWithValue})=>{

        console.log(otp,"create thunk");
        const response=await HostAuthService.VerifyOtp(otp)
        console.log(response,"thunk");

        if(response.message=="incorrect otp"){
            toast.error('Incorrect Otp', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
            return rejectWithValue("incorrect otp")
        }else{
            console.log('verify returnning');
            
            return response
        }
        
    }
)

export const hostresendOtp=createAsyncThunk(
    'hostAuth/resendOtp',
    async()=>{
        const response =await HostAuthService.resendOtp()
        return response.data
    }
)

export const editprofile=createAsyncThunk(
    'hostAuth/editprofile',
    async({values},{rejectWithValue})=>{
      console.log('values from  action',values);
      
      const response =await HostAccountService.hosteditProfile(values)
      console.log(response);
      

      return response
    }
  )


export const hostuploadphoto=createAsyncThunk(
    'auth/uploadphoto',
    async({file,email},{rejectWithValue})=>{
      console.log(file,email,"from action");
      
      const response =await HostAccountService.hostuploadPhoto(file,email)
      return response
    }
  )



  export const hostchangePassword=(password,email)=>async()=>{
    try {

      const res=await HostAccountService.hostchangePassword(password,email)
      return res
      
    } catch (error) {
      console.log(error.message);
      
    }
  }