import axios from 'axios'
import { HOST_CHANGE_PASS, HOST_EDIT_PROFILE, HOST_UPLOAD_PHOTO } from '../features/Host/auth/authTypes';

const API_URL='http://localhost:3000';


const hosteditProfile=async(values)=>{
    const response=await axios.post(API_URL+HOST_EDIT_PROFILE,{values},{withCredentials:true})
    return response.data
}


const hostuploadPhoto=async(file,email)=>{
    console.log(file,email,"from service");
    
    const formData=new FormData()
    formData.append('file',file)
    formData.append('email',email)
    const response=await axios.post(API_URL+HOST_UPLOAD_PHOTO,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    return response.data
}



const hostchangePassword=async(password,email)=>{
    try {
        const response =await axios.post(API_URL+HOST_CHANGE_PASS,{password,email},{withCredentials:true})
        return response.data
        
    } catch (error) {
        console.log(error.message);
        
    }
}


const HostAccountService={
    hosteditProfile,
    hostuploadPhoto,
    hostchangePassword
}


export default HostAccountService