import { Request,Response } from "express";
import { HostChatService} from "../../../application/services/HostService/HostChatService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { io } from "../../../config/Socket";



const hostRepository = new HostRepositoryImpl();
const hostChatService=new HostChatService(hostRepository)


export const fetchHostConnection=async(req:Request,res:Response)=>{
    try {
        const hostId = req.query.hostId;
          
        console.log(hostId,"hostId form controller");
        
       
        if (typeof hostId !== 'string') {
          return res.status(400).json({ message: "Invalid userId" });
        }
    
        const response = await hostChatService.fetchHostConnection(hostId);
    
        if (response) {
          return res.status(201).json({ response });
        }
      } catch (error: any) {
        res.status(500).json({ message: "error" });
      }
}


export const connectUser=async (req:Request,res:Response) => {
    try {
        const {userId,hostId,data}=req.body
        const response=await hostChatService.connectUser(userId,hostId,data)
        io.emit("message",{sender:hostId,receiver:userId,data:data})
        if(response){
            return res.status(201).json({response:response})
        }
    } catch (error:any) {
        res.status(500).json({message:"error"})
    }
}



export const fetchHostMessage=async(req:Request,res:Response)=>{
  try {

    const hostId=req.query.hostId
    const userId=req.query.userId
    console.log(hostId,userId,"hostId userID");
  
    if (typeof userId !== 'string'||typeof hostId !== 'string') {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const fetch=await hostChatService.fetchHostMessage(hostId,userId)
    if(fetch){
      res.status(200).json({fetch})
    }
  } catch (error:any) {
    res.status(500).json({ message: "error" });
  }
}


export const fetchNotifications=async(req:Request,res:Response)=>{
  try {

    const fetch=await hostChatService.fetchNotifications()
    if(fetch){
      res.status(200).json({fetch})
    }
  } catch (error:any) {
    res.status(500).json({ message: "error" });
  }
}
