import AuthService from "../../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../services/UserAccountService";
import propertyService from "../../../services/PropertyService";

export const register=(name,email,password)=>async()=>{
    const data=await AuthService.register(name,email,password)
    return data
    
}

// export const otpVerify=(otp)=>async()=>{
//     const data=await AuthService.otpVerify(otp)
//     return data
// }

export const otpVerify=createAsyncThunk(
  'auth/otpVerify',
  async({otp},{rejectWithValue})=>{
    const res=await AuthService.otpVerify(otp)
    if(res.message==="OTP verified and registration successful"){
      return res
    }
  }
)




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
        }else if(response.data.message==="Account Blocked"){
          toast.error('Your Account Blocked', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
          return rejectWithValue('block')
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

  export const fetchHostel=()=>async()=>{
    try {
      const res= await propertyService.fetchhostel()
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }

  export const fetchRoom=()=>async()=>{
    try {
      const res=await propertyService.fetchRoom()
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }
  
  export const popertyDetails=(id)=>async()=>{
    try {
      const res=await propertyService.propertyDetails(id)
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }

  export const wishlist=(id,proId)=>async()=>{
    try {
      console.log('wishlist ',id,proId);
      
      const res=await propertyService.addwishlist(id,proId)
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }

  export const findwish=(userId)=>async()=>{
    try {
      const res=await propertyService.findwish(userId)
      console.log(res,"form action");
      
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }


  export const fetchWishlist=(id)=>async()=>{
    try {
      const res=await propertyService.fetchwishlist(id)
      return res
    } catch (error) {
      console.log(error);
      
    }
  }

  export const removewish=(id,userId)=>async()=>{
    try {
      const res=await propertyService.removeWish(id,userId)
      return res
    } catch (error) {
      console.log(error.message);
      
    }
  }