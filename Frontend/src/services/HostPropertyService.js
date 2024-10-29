import axios from "axios";
import { ADD_PROPERTY, FETCH_AMENITIES ,FETCH_PROPERTY,FETCH_SAFETY, UPDATE_PROPERTY,AVAILABLE, FETCH_RESERVATION, ACTION_RESERVATION, FETCH_RATING} from "../features/Host/auth/authTypes";
import { FaTruckMonster } from "react-icons/fa";
import { responsiveFontSizes } from "@mui/material";
const API_URL='https://hostelhaven.site';


const fetchamenities=async()=>{
    const response =await axios.get(API_URL+FETCH_AMENITIES,{withCredentials:true})
    return response.data
}

const fetchsafety=async()=>{
    const response=await axios.get(API_URL+FETCH_SAFETY,{withCredentials:true})
    return response.data
}

const addproperty=async(formData)=>{
    const response=await axios.post(API_URL+ADD_PROPERTY,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    },{withCredentials:true})

    return response.data
}

const fetchProperty=async(id)=>{
    const response =await axios.post(API_URL+FETCH_PROPERTY,{id},{withCredentials:true})
    console.log(response,"service");
    
    return response.data
}


const updateproperty=async(formData)=>{
    const response=await axios.post(API_URL+UPDATE_PROPERTY,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    },{withCredentials:true})

    return response.data
}

const available=async(id,hostId)=>{
    const response=await axios.post(API_URL+AVAILABLE,{id,hostId},{withCredentials:true})
    return response.data
}


const reservation=async(hostId)=>{
    const response=await axios.post(API_URL+FETCH_RESERVATION,{hostId},{withCredentials:true})
    return response.data
}


const actionOnReservation=async(action,id)=>{
    const response=await axios.post(API_URL+ACTION_RESERVATION,{action,id},{withCredentials:true})
    return response.data
}

const fetchRatings=async(proId)=>{
    const response=await axios.get(`${API_URL}${FETCH_RATING}?proId=${proId}`,{withCredentials:true})
    return response.data
}



const AddPropertyService={
    fetchamenities,
    fetchsafety,
    addproperty,
    fetchProperty,
    updateproperty,
    available,
    reservation,
    actionOnReservation,
    fetchRatings
}

export default AddPropertyService
