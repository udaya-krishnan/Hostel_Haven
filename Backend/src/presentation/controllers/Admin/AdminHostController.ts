import { Request,Response } from "express";
import { AdminHostService } from "../../../application/services/AdminService/AdminHostService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";

const adminRepository=new AdminRepositoryImpl()
const adminhostRepository=new AdminHostService(adminRepository)


export const fetchingHostData=async(req:Request,res:Response)=>{
    try {
        const hostData =await adminhostRepository.fetchingHost()
        res.status(200).json({message:"user data fetched",hostData:hostData})
    } catch (error:any) {
        console.log(error.message)
        
    }
}

export const hostDetails=async(req:Request,res:Response)=>{
    try {

        const id=req.body.id
        console.log(id);
        
        const hostData=await adminRepository.hostDetails(id)
        
        res.status(200).json({hostData:hostData})
        

    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const fetchProperty=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const property=await adminRepository.fetchHostProperty(id)
        console.log(property);
        
        res.status(200).json({property:property})
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const propertyDetails=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        console.log(id ,"property id");
        
        const property=await adminRepository.propertyDetails(id)
        res.status(200).json({property:property})
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const approveProperty=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const property=await adminRepository.approveproperty(id)

        res.status(200).json({property:property})
        
    } catch (error:any) {
       console.log(error.message);
        
    }
}


export const rejecteProperty=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const property=await adminRepository.rejectproperty(id)

        res.status(200).json({property:property})
        
    } catch (error:any) {
       console.log(error.message);
        
    }
}