import { Request,Response } from "express";
import { ChatService } from "../../../application/services/UserService/ChatService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";



const userRepository = new UserRepositoryImpl();
const chatService=new ChatService(userRepository)


export const connectHost=async (req:Request,res:Response) => {
    try {
        const {userId,hostId,data}=req.body
        const response=await chatService.connectHost(userId,hostId,data)
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
        
      console.log(hostId,"hostId form controller");
      
     
      if (typeof hostId !== 'string') {
        return res.status(400).json({ message: "Invalid hostId" });
      }
  
      const response = await chatService.fetchHost(hostId);
  
      if (response) {
        return res.status(201).json({ response });
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
  