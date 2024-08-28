import axios from "axios";
import { ACTION_USER, ADMIN_LOGIN, FETCH_USER } from "../features/Admin/auth/authType";

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

const ActionUser=async(id)=>{
    const response =await axios.post(API_URL+ACTION_USER,{id})
    return response.data
}



const AdminService={
    adminlogin,
    FetchingUser,
    ActionUser
}


export default AdminService