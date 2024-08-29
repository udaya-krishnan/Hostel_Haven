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