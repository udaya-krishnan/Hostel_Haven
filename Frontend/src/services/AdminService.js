import axios from "axios";
import { ADMIN_LOGIN } from "../features/Admin/auth/authType";

const API_URL='http://localhost:3000';

const adminlogin=async(email,password)=>{
    console.log(email,password,"in service");
    const response=await axios.post(API_URL+ADMIN_LOGIN,{email,password},{withCredentials:true})
    return response.data
}



const AdminService={
    adminlogin
}


export default AdminService