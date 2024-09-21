import { Request,Response } from "express";
import { HostReservationService } from "../../../application/services/HostService/HostReservationService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";


const hostRepository=new HostRepositoryImpl()
const hostReservationService=new HostReservationService(hostRepository)

export const actionReservation=async(req:Request,res:Response)=>{
    try {
        console.log(req.body);
        const {action,id}=req.body
        const response=await hostReservationService.actionreservation(action,id)

        if(response){
            res.status(200).json({message:"reservation action changed"})
        }

        
    } catch (error:any) {
        console.log(error.message);
        
    }
}