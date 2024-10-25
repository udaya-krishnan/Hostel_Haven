import { Request,Response } from "express";
import { ChatService } from "../../../application/services/UserService/ChatService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { io } from "../../../config/Socket";



const userRepository = new UserRepositoryImpl();
const chatService=new ChatService(userRepository)


export const connectHost=async (req:Request,res:Response) => {
    try {
        const {userId,hostId,data}=req.body
        const response=await chatService.connectHost(userId,hostId,data)
        io.emit("message",{sender:userId,receiver:hostId,data:data})
        if(response){
            return res.status(201).json({response:response})
        }
    } catch (error:any) {
        res.status(500).json({message:"error"})
    }
}



export const fetchHost = async (req: Request, res: Response) => {
    try {
      const hostId = req.query.hostId;
      const userId=req.query.userId
        
      console.log(hostId,userId,"hostId form controller");
      
     
      if (typeof hostId !== 'string'||typeof userId !== 'string') {
        return res.status(400).json({ message: "Invalid hostId" });
      }
  
      const {fetch,message} = await chatService.fetchHost(hostId,userId);
  
      if (fetch||message) {
        return res.status(201).json({ fetch:fetch,message:message });
      }
    } catch (error: any) {
      res.status(500).json({ message: "error" });
    }
  };



  export const fetchConnection = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
        
      console.log(userId,"userId form controller");
      
     
      if (typeof userId !== 'string') {
        return res.status(400).json({ message: "Invalid userId" });
      }
  
      const response = await chatService.fetchConnection(userId);
  
      if (response) {
        return res.status(201).json({ response });
      }
    } catch (error: any) {
      res.status(500).json({ message: "error" });
    }
  };


  export const fetchUserMessage=async(req:Request,res:Response)=>{
    try {

      const hostId=req.query.hostId
      const userId=req.query.userId
      console.log(hostId,userId,"hostId userID");
    
      if (typeof userId !== 'string'||typeof hostId !== 'string') {
        return res.status(400).json({ message: "Invalid userId" });
      }

      const fetch=await chatService.fetchUserMessage(hostId,userId)
      if(fetch){
        res.status(200).json({fetch})
      }
    } catch (error:any) {
      res.status(500).json({ message: "error" });
    }
  }
  



  export const fetchNotifications=async(req:Request,res:Response)=>{
    try {

      const fetch=await chatService.fetchNotifications()
      if(fetch){
        res.status(200).json({fetch})
      }
    } catch (error:any) {
      res.status(500).json({ message: "error" });
    }
  }
  