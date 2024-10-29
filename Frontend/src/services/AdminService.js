import axios from "axios";
import { ACTION_USER, ADMIN_LOGIN, FETCH_USER ,FETCH_HOST, USER_DETAILS, HOST_DETAILS, ADD_AMENITIES, FETCH_AMENITIES, ACTION_AMENITIES, UPDATE_AMENITIES, ADD_SAFETY, FETCH_SAFETY, ACTION_SAFETY, UPDATE_SAFETY, FECTH_HOST_PROPERTY, PROPERTY_DETAILS, APPROVE_PROPERTY, REJECT_PROPERTY, ADDCOUPON, FETCHCOUPON, ACTION_COUPON, EDIT_COUPON, FETCH_BANNER, EDIT_BANNER, FETCH_WALLET, FETCH_ALL_DATA, FETCH_RATING, SEND_NOTIFICATION} from "../features/Admin/auth/authType";

const API_URL='https://hostelhaven.site';

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

const updateamenities=async(id,name)=>{
    const response =await axios.post(API_URL+UPDATE_AMENITIES,{id,name})
    return response.data
}

const addsafety=async (name)=>{
    console.log(name,"service");
    
    const response =await axios.post(API_URL+ADD_SAFETY,{name})
    return response.data
}

const fetchSafety=async()=>{
    const response=await axios.get(API_URL+FETCH_SAFETY)
    return response.data
}

const actionsafety=async(id)=>{

  const response= await axios.post(API_URL+ACTION_SAFETY,{id})
  return response.data
}

const updatesafety=async(id,name)=>{
    const response=await axios.post(API_URL+UPDATE_SAFETY,{id,name})
    return response.data
}

const fetchHostProperty=async(id)=>{
    const response=await axios.post(API_URL+FECTH_HOST_PROPERTY,{id})
    console.log(response.data,"dhfisdhf");
    
    return response.data
}


const propertyDetails=async(id)=>{
    const response=await axios.post(API_URL+PROPERTY_DETAILS,{id})
    return response.data
}

const approveproperty=async(id)=>{
    const response=await axios.post(API_URL+APPROVE_PROPERTY,{id})
    return response.data
}
const rejectproperty=async(id)=>{
    const response=await axios.post(API_URL+REJECT_PROPERTY,{id})
    return response.data
}

const addcoupon=async(data)=>{
    const response=await axios.post(API_URL+ADDCOUPON,{data})
    return response.data
}

const fetchcoupons=async()=>{
    const response=await axios.get(API_URL+FETCHCOUPON)
    return response.data
}

const actioncoupon=async(id)=>{
    const response=await axios.post(API_URL+ACTION_COUPON,{id})
    return response.data
}
const editcoupon=async(id,data)=>{
    const response=await axios.post(API_URL+EDIT_COUPON,{id,data})
    return response.data
}

const fetchbanner=async()=>{
    const response=await axios.get(API_URL+FETCH_BANNER)
    return response.data
}

const editbanner=async(formData)=>{

    console.log(formData,"form data is action");
    
    const response=await axios.put(API_URL+EDIT_BANNER,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

    return response.data
}



const fetchWallet=async()=>{
    const response=await axios.get(API_URL+FETCH_WALLET)
    return response.data
}

const fetchAll=async()=>{
    const response=await axios.get(API_URL+FETCH_ALL_DATA)
    return response.data
}



const fetchRating=async()=>{
    const response=await axios.get(API_URL+FETCH_RATING,{withCredentials:true})
    return response.data
}

const sendnotification=async(data)=>{
    console.log(data,'it from the service');
    
    const response=await axios.post(API_URL+SEND_NOTIFICATION,{data},{withCredentials:true})
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
    actionAmenities,
    updateamenities,
    addsafety,
    fetchSafety,
    actionsafety,
    updatesafety,
    fetchHostProperty,
    propertyDetails,
    approveproperty,
    rejectproperty,
    addcoupon,
    fetchcoupons,
    actioncoupon,
    editcoupon,
    fetchbanner,
    editbanner,
    fetchWallet,
    fetchAll,
    fetchRating,
    sendnotification
    
}


export default AdminService