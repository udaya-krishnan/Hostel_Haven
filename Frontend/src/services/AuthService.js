import axios from 'axios'
import { REGISTER_URL, VERIFY_OTP } from '../features/auth/authTypes';

const API_URL='http://localhost:3000';

const register=async(name,email,password)=>{
    let userType="user"
    const response=await axios.post(API_URL+REGISTER_URL,{name,email,password,userType});
    console.log(response.data);
    
    return response.data
}

const otpVerify=async(otp)=>{
    const response =await axios.post(API_URL+VERIFY_OTP,{otp})
}

const AuthService={
    register,

}


export default AuthService;