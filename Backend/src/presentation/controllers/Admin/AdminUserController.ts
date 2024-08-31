import { Request,Response } from "express";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";
import { AdminUserService } from "../../../application/services/AdminService/AdminUserService";

const adminRepository=new AdminRepositoryImpl()
const adminUserRepository=new AdminUserService(adminRepository)

export const fetchingUserData=async(req:Request,res:Response)=>{
    try {
        const userData =await adminUserRepository.fetchingUsers()
        res.status(200).json({message:"user data fetched",userData:userData})
    } catch (error:any) {
        console.log(error.message)
        
    }
}

export const actionUser=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        // console.log(id,"id in controller");
        
        const action = await adminUserRepository.actionUser(id)

      res.status(200).json({id:action})
        
    } catch (error:any) {
        console.log(error.message)
    }
}

export const userDetails=async(req:Request,res:Response)=>{
    try {

        const id=req.body.id
        const userData=await adminRepository.userDetails(id)
        
        res.status(200).json({userData:userData})

    } catch (error:any) {
        console.log(error.message);
        
    }
}