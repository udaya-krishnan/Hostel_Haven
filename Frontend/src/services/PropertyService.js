import axios from "axios";
// import storage from 'redux-persist/lib/storage';
import { FECTH_HOSTEL, FECTH_WISHLIST, FETCH_ROOM, FETCH_WISH, FIND_WISH, PROPERTY_DETAILS, REMOVE_WISH, WISHLIST } from "../features/User/auth/authTypes";
import { removeAuthPersistedState } from "../utils/PersistedUser";


const API_URL='http://localhost:3000';

const fetchhostel=async(search)=>{
    const response =await axios.post(API_URL+FECTH_HOSTEL,{search})
    return response.data
}
const fetchRoom=async(search)=>{
    const response=await axios.post(API_URL+FETCH_ROOM,{search})
    return response.data
}

const propertyDetails=async(id)=>{
    const response=await axios.post(API_URL+PROPERTY_DETAILS,{id})
    return response.data
}

const addwishlist=async(id,proId)=>{
    try {

        console.log(id,proId,"form add wishkist");
    
        const response=await axios.post(API_URL+WISHLIST,{id,proId},{withCredentials:true})
        return response.data
        
    } catch (error) {
        if(error.response.data.message=="Refresh token expired or invalid"){
            console.log('refresh token expaired');
            UserPersisted()
              console.log('user removed success fulli');
              
        }
    }
}

const findwish=async(userId)=>{
    try {
        console.log('hai teresdjfhskfhdj');
        const response=await axios.post(API_URL+FIND_WISH,{userId},{withCredentials:true})
        console.log(response.data,"haiadjadj");
        return response.data
    } catch (error) {
        throw error
    }
}

const fetchwishlist=async(id)=>{
    try {
        console.log(id,'form the wishlist');
    
        const response=await axios.post(API_URL+FECTH_WISHLIST,{id},{withCredentials:true})
        return response.data
    } catch (error) {
       throw error
    }
    
}

const removeWish=async(id,userId)=>{
    try {
        console.log(id,userId);
        const response=await axios.delete(API_URL+REMOVE_WISH,{id,userId},{withCredentials:true})
        return response.data
    } catch (error) {
        if(error.response.data.message=="Refresh token expired or invalid"){
            console.log('refresh token expaired');
            // UserPersisted()
              console.log('user removed success fulli');
              
        }
    }
   
    
}

const fetchWish=async(id,userId)=>{
    try {
        const response=await axios.post(API_URL+FETCH_WISH,{id,userId},{withCredentials:true})
        return response.data
    } catch (error) {
        if(error.response.data.message=="Refresh token expired or invalid"){
            console.log('refresh token expaired');
              
        }
    }
   
}


const propertyService={
    fetchhostel,
    fetchRoom,
    propertyDetails,
    addwishlist,
    findwish,
    fetchwishlist,
    removeWish,
    fetchWish
}

export default propertyService