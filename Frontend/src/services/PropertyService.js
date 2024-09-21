import axios from "axios";
import { FECTH_HOSTEL, FECTH_WISHLIST, FETCH_ROOM, FIND_WISH, PROPERTY_DETAILS, REMOVE_WISH, WISHLIST } from "../features/User/auth/authTypes";


const API_URL='http://localhost:3000';

const fetchhostel=async()=>{
    const response =await axios.get(API_URL+FECTH_HOSTEL)
    return response.data
}
const fetchRoom=async()=>{
    const response=await axios.get(API_URL+FETCH_ROOM)
    return response.data
}

const propertyDetails=async(id)=>{
    const response=await axios.post(API_URL+PROPERTY_DETAILS,{id})
    return response.data
}

const addwishlist=async(id,proId)=>{
    console.log(id,proId,"form add wishkist");
    
    const response=await axios.post(API_URL+WISHLIST,{id,proId})
    return response.data
}

const findwish=async(userId)=>{
    console.log('hai teresdjfhskfhdj');
    const response=await axios.post(API_URL+FIND_WISH,{userId})
    console.log(response.data,"haiadjadj");
    return response.data
}

const fetchwishlist=async(id)=>{
    console.log(id,'form the wishlist');
    
    const response=await axios.post(API_URL+FECTH_WISHLIST,{id})
    return response.data
}

const removeWish=async(id,userId)=>{
    console.log(id,userId);
    const response=await axios.post(API_URL+REMOVE_WISH,{id,userId})
    return response.data
    
}

const propertyService={
    fetchhostel,
    fetchRoom,
    propertyDetails,
    addwishlist,
    findwish,
    fetchwishlist,
    removeWish
}

export default propertyService