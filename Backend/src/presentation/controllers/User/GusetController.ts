import { Request,Response } from "express";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { GusetService } from "../../../application/services/UserService/GusetService";

const userRepository=new UserRepositoryImpl()
const gusetService=new GusetService(userRepository)

export const addGusetInfo=async(req:Request,res:Response)=>{
    try {
        const data=req.body.data
        const gusetinfo=await gusetService.addinfo(data)
        res.status(200).json({data:gusetinfo})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}