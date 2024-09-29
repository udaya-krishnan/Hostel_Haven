import axios from "axios";
import { BOOKING_DETAILS, CONTINUE_PAYMENT, FETCH_RESERVATION } from "../features/User/auth/authTypes";

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

const UserResService={
        fechReservation,
        bookingdetails,
        continuepayment
}

export default UserResService