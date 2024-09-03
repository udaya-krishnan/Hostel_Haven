import { Request,Response } from "express";
import { HostPropertyService } from "../../../application/services/HostService/HostPropertyService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";


const hostrepository=new HostRepositoryImpl()
const hostpropertyservice=new HostPropertyService(hostrepository)

export const fetchamenities=async(req:Request,res:Response)=>{
    try {
        const allamenities=await hostpropertyservice.fetchamenities()
        res.status(200).json({allamenities:allamenities})
    } catch (error:any) {
        console.log(error.message)
    }
}


export const fetchsafety=async(req:Request,res:Response)=>{
    try {
        const allsafety=await hostpropertyservice.fetchsafety()
        res.status(200).json({allsafety:allsafety})
    } catch (error:any) {
        console.log(error.messae);
        
    }
}
