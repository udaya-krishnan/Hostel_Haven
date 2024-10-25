import { Request,Response } from "express";
import { AdminAmenitieService } from "../../../application/services/AdminService/AdminAmenitieService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";

const adminRepository=new AdminRepositoryImpl()
const adminAmenitiesRepo=new AdminAmenitieService(adminRepository)

export const addAmenitie= async (req:Request,res:Response)=>{
    try {
        const value=req.body.value
        const allAmenties=await adminAmenitiesRepo.addamenities(value)
        res.status(200).json({allData:allAmenties})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchamenities=async (req:Request,res:Response)=>{
    try {

        const data=await adminAmenitiesRepo.fetchamenities()
        res.status(200).json({data:data})
        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const actionAmenities=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const action=await adminRepository.actionAmenities(id)
        res.status(200).json({id:action})
    } catch (error:any) {
        console.log(error.message)
    }
}

export const updateAmenities=async(req:Request,res:Response)=>{
    try {
        const {id,name}=req.body
        const update=await adminRepository.updateAmenities(id,name)

        if(update){
            res.status(200).json({message:"update amenities"})
        }
        
    } catch (error:any) {
        console.log(error.message)
    }
}