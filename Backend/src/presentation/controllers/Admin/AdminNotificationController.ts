import { Request,Response } from "express";
import { AdminNotificationService } from "../../../application/services/AdminService/AdminNotificationService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";
import { io } from "../../../config/Socket";

const adminRepository=new AdminRepositoryImpl()
const adminNotiRepository=new AdminNotificationService(adminRepository)

export const sendNotication=async(req:Request,res:Response)=>{
    try {
        const data=req.body.data
        console.log(data,'it from the controller');
        
        io.emit("notification",{message:data.message,recipient:data.recipient,type:data.messageType})
        const response=await adminNotiRepository.sendNotification(data)
        res.status(201).json({message:"sended notification"})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}