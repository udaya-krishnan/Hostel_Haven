import axios from "axios";
import { BOOKING_DETAILS, CANCEL_RES, CONTINUE_PAYMENT, FETCH_RESERVATION, RATING } from "../features/User/auth/authTypes";

const API_URL='http://localhost:3000';


const fechReservation=async(id)=>{
        const response=await axios.post(API_URL+FETCH_RESERVATION,{id},{withCredentials:true})
        return response.data
}

const bookingdetails=async(id)=>{
        const res=await axios.post(API_URL+BOOKING_DETAILS,{id},{withCredentials:true})
        return res.data
}

const continuepayment=async(amount)=>{
        const res=await axios.post(API_URL+CONTINUE_PAYMENT,{amount},{withCredentials:true})
        return res.data
}

const ratingProperty=async(userId,proId,rate,review)=>{
        const res=await axios.post(API_URL+RATING,{userId,proId,rate,review},{withCredentials:true})
        return res.data
}

const cancelReservation=async(resId)=>{
        const res=await axios.patch(API_URL+CANCEL_RES,{resId},{withCredentials:true})
        return res
}

const UserResService={
        fechReservation,
        bookingdetails,
        continuepayment,
        ratingProperty,
        cancelReservation
}

export default UserResService