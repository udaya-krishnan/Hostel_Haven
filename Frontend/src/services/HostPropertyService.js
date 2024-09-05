import axios from "axios";
import { ADD_PROPERTY, FETCH_AMENITIES ,FETCH_PROPERTY,FETCH_SAFETY} from "../features/Host/auth/authTypes";
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



const AddPropertyService={
    fetchamenities,
    fetchsafety,
    addproperty,
    fetchProperty
}

export default AddPropertyService
