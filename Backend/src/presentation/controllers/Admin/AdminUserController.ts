import { Request,Response } from "express";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";
import { AdminUserService } from "../../../application/services/AdminService/AdminUserService";

const adminRepository=new AdminRepositoryImpl()
const adminUserRepository=new AdminUserService(adminRepository)

export const fetchingUserData=async(req:Request,res:Response)=>{
    try {
        const userData =await adminRepository.fetchingUsers()
        res.status(200).json({message:"user data fetched",userData:userData})
    } catch (error:any) {
        console.log(error.message)
        
    }
}