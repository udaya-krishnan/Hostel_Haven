import axios from "axios";
import { ACTION_USER, ADMIN_LOGIN, FETCH_USER ,FETCH_HOST, USER_DETAILS, HOST_DETAILS, ADD_AMENITIES, FETCH_AMENITIES, ACTION_AMENITIES} from "../features/Admin/auth/authType";

const API_URL='http://localhost:3000';

const adminlogin=async(email,password)=>{
    console.log(email,password,"in service");
    const response=await axios.post(API_URL+ADMIN_LOGIN,{email,password},{withCredentials:true})
    return response.data
}

const FetchingUser=async()=>{
    const response=await axios.get(API_URL+FETCH_USER)

    return response.data
}
const FetchingHost=async()=>{
    const response=await axios.get(API_URL+FETCH_HOST)
    console.log("respose",response);
    
    return response.data
}


const ActionUser=async(id)=>{   
    const response =await axios.post(API_URL+ACTION_USER,{id})
    return response.data
}

const userDatails=async(id)=>{
    const response =await axios.post(API_URL+USER_DETAILS,{id})
    return response.data
}

const hostDetails=async(id)=>{
    const response =await axios.post(API_URL+HOST_DETAILS,{id})
    return response.data
}

const Addamenities=async(value)=>{
    const response=await axios.post(API_URL+ADD_AMENITIES,{value})
    return response.data
}

const fetchAmenities=async()=>{
    const response=await axios.get(API_URL+FETCH_AMENITIES)
    console.log(response.data,"resposne service");
    
    return response.data
}


const actionAmenities=async(id)=>{
    const response=await axios.post(API_URL+ACTION_AMENITIES,{id})
    return response.data
}
const AdminService={
    adminlogin,
    FetchingUser,
    ActionUser,
    FetchingHost,
    userDatails,
    hostDetails,
    Addamenities,
    fetchAmenities,
    actionAmenities
    
}


export default AdminService