import axios from "axios";
import { GUSET_INFO, PAYMENT_FAILED, RAZOPAY_VERIFY, RAZORPAY, RETRY_VERIFY } from "../features/PaymentType";

const API_URL='https://hostelhaven.site';

const rezorpay=async(amount,guestId,userId,proId,durationInMonths,checkInDate,checkOutDate)=>{
    try {
        const response=await axios.post(API_URL+RAZORPAY,{amount,guestId,userId,proId,durationInMonths,checkInDate,checkOutDate},{withCredentials:true})
        return response.data
    } catch (error) {
        console.log(error.message);
        
    }
}

const verifyRazorpay=async(order,amount,reservationId,userId,paymentMethod)=>{
    try {
        const response=await axios.post(API_URL+RAZOPAY_VERIFY,{order,amount,reservationId,userId,paymentMethod},{withCredentials:true})
        return response.data
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const GuestInfo=async(data)=>{
    try {
        const response=await axios.post(API_URL+GUSET_INFO,{data},{withCredentials:true})
        return response.data
    } catch (error) {
        
        console.log(error.message);
        
    }
}

const PaymentFailed=async(amount,reservationId,userId)=>{
    try {
        const response =await axios.post(API_URL+PAYMENT_FAILED,{amount,reservationId,userId},{withCredentials:true})
        return response
    } catch (error) {
        console.log(error.message);
        
    }
}

const retryVerify=async(response,paymentId)=>{
    try {

        const res=await axios.post(API_URL+RETRY_VERIFY,{response,paymentId},{withCredentials:true})
        return res.data
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const PaymentService={
    rezorpay,
    verifyRazorpay,
    GuestInfo,
    PaymentFailed,
    retryVerify
}

export default PaymentService