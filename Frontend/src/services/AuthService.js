import axios from 'axios'
import { FORGOT_PASS, GOOGLE_AUTH, LOGIN, REGISTER_URL, RESEND, VERIFY_EMAIL, VERIFY_OTP } from '../features/User/auth/authTypes';
import { HOST_RESEND } from '../features/Host/auth/authTypes';
const API_URL='https://hostelhaven.site';

const register=async(name,email,password)=>{
    try {
        let userType="user"
        const response=await axios.post(API_URL+REGISTER_URL,{name,email,password,userType},{withCredentials:true});
        console.log(response.data);
        return response.data
    } catch (error) {
        throw error
    }
   
}


const otpVerify=async(otp)=>{
    try {
        console.log("otpverify in service");
    
        const response =await axios.post(API_URL+VERIFY_OTP,{otp},{withCredentials:true})
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.log(error,'errrrr');
        
        throw error
    }
}

const loginverify=async(email,password)=>{
    console.log(email,password,"auth serice");
    
    const response= await axios.post(API_URL+LOGIN,{email,password},{withCredentials:true})
    return response
}

const resendOtp=async()=>{
    try {
        console.log("resend otp  in service")
        const response=await axios.get(API_URL +RESEND, { withCredentials: true });
        console.log(response);
        return response.data
    } catch (error) {
        throw error
    }
   
}

const googleRegister=async(data)=>{
     let userType="user"
    const response=await axios.post(API_URL+GOOGLE_AUTH,{data,userType},{withCredentials:true})
    return response.data
}

const verifyEmail=async(email)=>{
    try {
        const response =await axios.post(API_URL+VERIFY_EMAIL,{email},{withCredentials:true})
        console.log(response.data,"service");
        
        return response.data
    } catch (error) {
        throw error
    }
  
}

const forgotpass=async(data)=>{
    try {
        const response=await axios.patch(API_URL+FORGOT_PASS,{data},{withCredentials:true})
    console.log(response.data,"service")
    return response.data
    } catch (error) {
        throw error
    }
    
}

const AuthService={
    register,
    otpVerify,
    loginverify,
    resendOtp,
    googleRegister,
    verifyEmail,
    forgotpass
}


export default AuthService;