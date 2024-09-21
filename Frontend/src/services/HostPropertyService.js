import axios from "axios";
import { ADD_PROPERTY, FETCH_AMENITIES ,FETCH_PROPERTY,FETCH_SAFETY, UPDATE_PROPERTY,AVAILABLE, FETCH_RESERVATION, ACTION_RESERVATION} from "../features/Host/auth/authTypes";
const API_URL='http://localhost:3000';


const fetchamenities=async()=>{
    const response =await axios.get(API_URL+FETCH_AMENITIES)
    return response.data
}

const fetchsafety=async()=>{
    const response=await axios.get(API_URL+FETCH_SAFETY)
    return response.data
}

const addproperty=async(formData)=>{
    const response=await axios.post(API_URL+ADD_PROPERTY,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

    return response.data
}

const fetchProperty=async(id)=>{
    const response =await axios.post(API_URL+FETCH_PROPERTY,{id})
    console.log(response,"service");
    
    return response.data
}


const updateproperty=async(formData)=>{
    const response=await axios.post(API_URL+UPDATE_PROPERTY,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

    return response.data
}

const available=async(id,hostId)=>{
    const response=await axios.post(API_URL+AVAILABLE,{id,hostId})
    return response.data
}


const reservation=async(hostId)=>{
    const response=await axios.post(API_URL+FETCH_RESERVATION,{hostId})
    return response.data
}


const actionOnReservation=async(action,id)=>{
    const response=await axios.post(API_URL+ACTION_RESERVATION,{action,id})
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
    actionOnReservation
}

export default AddPropertyService
