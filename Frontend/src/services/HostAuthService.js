import axios from "axios";
import { HOST_LOGIN, HOST_RESEND, HOST_VERIFY } from "../features/Host/auth/authTypes";


const API_URL='http://localhost:3000';

const LoginHost=async(email,password)=>{
    console.log(email,password,"in service");
    
     const response=await axios.post(API_URL+HOST_LOGIN,{email,password},{withCredentials:true})
     console.log(response);
     
     return response.data
}

const VerifyOtp=async(otp)=>{
    try {
        const response=await axios.post(API_URL+HOST_VERIFY,{otp},{withCredentials:true})
        console.log(response.data,"service");
        
        return response.data
    } catch (error) {
        
    }
}

const resendOtp=async()=>{
    const response=await axios.get(API_URL+HOST_RESEND,{withCredentials:true})
    return response.data
}


const HostAuthService={
    LoginHost,
    VerifyOtp,
    resendOtp
}

export default HostAuthService