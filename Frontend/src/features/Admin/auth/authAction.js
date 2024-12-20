import { createAsyncThunk } from "@reduxjs/toolkit";

import AdminService from "../../../services/AdminService";

export const  loginadmin=createAsyncThunk(
    'admin/loginadmin',
    async({email,password},{rejectWithValue})=>{
        console.log(email,password);

        const response=await AdminService.adminlogin(email,password)
        console.log(response,"res from the action");
        
        return response
        
    }
)

export const fetchinguser=()=>async()=>{
    const response=await AdminService.FetchingUser()
    return response
}

export const actionUser=(id)=>async()=>{
    const response=await AdminService.ActionUser(id)
    return response
}

export const fetchinghost=()=>async()=>{
    const response=await AdminService.FetchingHost()
    return response
}

export const userdatails=(id)=>async()=>{
    const response =await AdminService.userDatails(id)
    return response
}

export const hostdetails=(id)=>async()=>{
    const response =await AdminService.hostDetails(id)
    return response
}

export const addAmenities=(value)=>async()=>{
    const response=await AdminService.Addamenities(value)
    return response
}
export const fetchamenities=()=>async()=>{
    const response=await AdminService.fetchAmenities()
    return response
}

export const actionAmenities=(id)=>async()=>{
    const response =await AdminService.actionAmenities(id)
    return response
}

export const updateAmenities=({id,name})=>async()=>{
    
    const response =await AdminService.updateamenities(id,name)
   return response
    
}


export const fetchSafetyMeasures=()=>async()=>{
    const response=await AdminService.fetchSafety()
    return response
    
}

export const actionSafety=(id)=>async()=>{
    const response=await AdminService.actionsafety(id)
    return response
}

export const addSafety=(name)=>async()=>{
    console.log('safety',name);
    
    const response=await AdminService.addsafety(name)
    return response
}

export const updateSafety=(id,value)=>async()=>{
    const response=await AdminService.updatesafety(id,value)
    return response
}

export const fetchHostProperty=(id)=>async()=>{
    console.log(id,"id in the fecth");
    
    const response =await AdminService.fetchHostProperty(id)
    return response
}

export const property=(id)=>async()=>{
    const response=await AdminService.propertyDetails(id)
    return response
}

export const approveProperty=(id)=>async()=>{
    const response=await AdminService.approveproperty(id)
    return response
}

export const rejectProperty=(id)=>async()=>{
    const response=await AdminService.rejectproperty(id)
    return response
}

export const addCoupon=(data)=>async()=>{
    const response=await AdminService.addcoupon(data)
    return response
}

export const fetchCoupons=()=>async()=>{
    const response=await AdminService.fetchcoupons()
    return response
}

export const actionCoupon=(id)=>async()=>{
    const response=await AdminService.actioncoupon(id)
    return response
}



export const editCoupon=(id,data)=>async()=>{
    const response=await AdminService.editcoupon(id,data)
    return response
}

export const fetchBanner=()=>async()=>{
    const response=await AdminService.fetchbanner()
    return response
}

export const editBanner=(formdata)=>async()=>{
    console.log(formdata,"form data in servce");
    
    const response=await AdminService.editbanner(formdata)
    return response
}

export const fetchWalletHistory=()=>async()=>{
    const response= await AdminService.fetchWallet()
    return response
}

export const fetchAllData=()=>async()=>{
    const response= await AdminService.fetchAll()
    return response
}

export const fetchRating=()=>async()=>{
    const response=await AdminService.fetchRating()
    return response
}


export const sendNotification=(data)=>async()=>{
    const response=await AdminService.sendnotification(data)
    return response
}