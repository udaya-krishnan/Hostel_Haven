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