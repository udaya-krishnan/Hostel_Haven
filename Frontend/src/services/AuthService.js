import axios from 'axios'
import { GOOGLE_AUTH, LOGIN, REGISTER_URL, RESEND, VERIFY_OTP } from '../features/User/auth/authTypes';

const API_URL='http://localhost:3000';

const register=async(name,email,password)=>{
    let userType="user"
    const response=await axios.post(API_URL+REGISTER_URL,{name,email,password,userType},{withCredentials:true});
    console.log(response.data);
    
    return response.data
}

const otpVerify=async(otp)=>{
    console.log("otpverify in service");
    
    const response =await axios.post(API_URL+VERIFY_OTP,{otp},{withCredentials:true})
    console.log(response.data);
    
    return response.data
}

const loginverify=async(email,password)=>{
    console.log(email,password,"auth serice");
    
    const response= await axios.post(API_URL+LOGIN,{email,password},{withCredentials:true})
    return response
}

const resendOtp=async()=>{
    console.log("otp in service")
    const response=await axios.get(API_URL + RESEND, { withCredentials: true });
    console.log(response);
    

    return response.data
}

const googleRegister=async(data)=>{
     let userType="user"
    const response=await axios.post(API_URL+GOOGLE_AUTH,{data,userType},{withCredentials:true})
    return response.data
}

const AuthService={
    register,
    otpVerify,
    loginverify,
    resendOtp,
    googleRegister

}


export default AuthService;