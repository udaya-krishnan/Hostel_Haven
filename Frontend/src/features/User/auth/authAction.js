import AuthService from "../../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../services/UserAccountService";

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


  export const verifyEmail=(email)=>async()=>{
    const data=await AuthService.verifyEmail(email)
    console.log(data,"data");
    return data
  }

  export const forgotPass=(data)=>async()=>{
    const res=await AuthService.forgotpass(data)
    return res
  }

  export const editprofile=createAsyncThunk(
    'auth/editprofile',
    async({values},{rejectWithValue})=>{
      console.log('values from  action',values);
      
      const response =await AccountService.editProfile(values)
      console.log(response);
      
      return response
    }
  )


  export const uploadphoto=createAsyncThunk(
    'auth/uploadphoto',
    async({file,email},{rejectWithValue})=>{
      console.log(file,email,"from action");
      
      const response =await AccountService.uploadPhoto(file,email)
      return response
    }
  )


  export const changePassword=(password,email)=>async()=>{
    try {

      const res=await AccountService.changePassword(password,email)
      return res
      
    } catch (error) {
      console.log(error.message);
      
    }
  }