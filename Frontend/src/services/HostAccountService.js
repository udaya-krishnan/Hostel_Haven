import axios from 'axios'
import { ADDAMOUNT, FETCH_NOTIFICATIONS, FETCHPAYMENT, HOST_CHANGE_PASS, HOST_EDIT_PROFILE, HOST_UPLOAD_PHOTO, VERIFYAMOUNT } from '../features/Host/auth/authTypes';

const API_URL='https://hostelhaven.site';


const hosteditProfile=async(values)=>{

    try {
        const response=await axios.post(API_URL+HOST_EDIT_PROFILE,{values},{withCredentials:true})
        return response.data
    } catch (error) {
        throw error
    }
   
}


const hostuploadPhoto=async(file,email)=>{
    console.log(file,email,"from service");

    try {
        const formData=new FormData()
        formData.append('file',file)
        formData.append('email',email)
        const response=await axios.post(API_URL+HOST_UPLOAD_PHOTO,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        },{withCredentials:true})
        return response.data
    } catch (error) {
        throw error
    }
    
   
}



const hostchangePassword=async(password,email)=>{
    try {
        const response =await axios.post(API_URL+HOST_CHANGE_PASS,{password,email},{withCredentials:true})
        return response.data
        
    } catch (error) {
       throw error
        
    }
}

const fetchpayment=async(id)=>{
    try {
        const response = await axios.post(API_URL+FETCHPAYMENT,{id})
        return response.data
    } catch (error) {
        
    }
}


const addAmount=async(amount)=>{
    try {
        const response=await axios.post(API_URL+ADDAMOUNT,{amount})
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

const verifyAmount=async(order,hostId,amount)=>{
    try {
        const response =await axios.post(API_URL+VERIFYAMOUNT,{order,hostId,amount})
        return response.data
    } catch (error) {
        console.log(error.message);
        
    }
}


  
const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL + FETCH_NOTIFICATIONS, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error in changePassword:", error.message);
      throw error;  
    }
  };



const HostAccountService={
    hosteditProfile,
    hostuploadPhoto,
    hostchangePassword,
    fetchpayment,
    addAmount,
    verifyAmount,
    fetchNotifications
}


export default HostAccountService