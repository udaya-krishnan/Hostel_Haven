import { Request,Response } from "express";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";
import { AdminSafetyService } from "../../../application/services/AdminService/AdminSafetyService";

const adminRepository=new AdminRepositoryImpl()
const adminSafetyRepo=new AdminSafetyService(adminRepository)


export const addSafety=async(req:Request,res:Response)=>{
    try {
        const name=req.body.name
        console.log(name,"controller");
        
        const allSafety=await adminSafetyRepo.addSafety(name)
        res.status(200).json({allData:allSafety})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchSafety=async (req:Request,res:Response)=>{
    try {
        const data=await adminSafetyRepo.fetchSafety()
        res.status(200).json({data:data})
    } catch (error:any) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const actionSafety=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const action =await adminRepository.actionSafety(id)
        res.status(200).json({id:action})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const updateSafety=async(req:Request,res:Response)=>{
    try {
        const{id,name}=req.body
        const update=await adminRepository.updateSafety(id,name)
        res.status(200).json({message:"update safety"})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}