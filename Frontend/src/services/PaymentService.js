import axios from "axios";
import { GUSET_INFO, RAZOPAY_VERIFY, RAZORPAY } from "../features/PaymentType";

const API_URL='http://localhost:3000';

const rezorpay=async(amount,guestId,userId,proId,durationInMonths)=>{
    try {
        const response=await axios.post(API_URL+RAZORPAY,{amount,guestId,userId,proId,durationInMonths})
        return response.data
    } catch (error) {
        console.log(error.message);
        
    }
}

const verifyRazorpay=async(order,amount,reservationId,userId,paymentMethod)=>{
    try {
        const response=await axios.post(API_URL+RAZOPAY_VERIFY,{order,amount,reservationId,userId,paymentMethod})
        return response.data
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const GuestInfo=async(data)=>{
    try {
        const response=await axios.post(API_URL+GUSET_INFO,{data})
        return response.data
    } catch (error) {
        
        console.log(error.message);
        
    }
}

const PaymentService={
    rezorpay,
    verifyRazorpay,
    GuestInfo
}

export default PaymentService