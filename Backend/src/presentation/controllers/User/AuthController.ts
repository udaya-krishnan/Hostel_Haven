import { Request, Response } from "express";
import { RegisterService } from "../../../application/services/UserService/RegisterService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { generateOtp } from "../../../utils/otp"; 
import sendMail from "../../../utils/sendMail";
import { createToken, verifyToken } from "../../../utils/jwt";
import { UserEntities } from "../../../domain/entities/User";
import dotenv from 'dotenv'
import { LoginService } from "../../../application/services/UserService/LoginService";
dotenv.config()


const userRepository = new UserRepositoryImpl();
const registerService = new RegisterService(userRepository);
const loginService =new LoginService(userRepository)

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;
    console.log(name, email, password);
    const userExists=await registerService.find(email)
    if(userExists){
        res.status(200).json({message:"email exists"})
    }else{
        const otp=generateOtp()
        const data = {
            name: name,
            email: email,
            password: password,
            userType: userType,
            otp: otp,
          };
          console.log(data);
         const token= await createToken(data,res)
           await sendMail(email,otp,name)
           console.log(otp);
           
        return res.status(200).json({message:"otp send success",token:token})
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



export const otpVerify = async (req: Request , res: Response) => {
  try {
    console.log("hai there");
    const token = req.cookies.jwt
    // console.log(token);
    const decodedData = await verifyToken(token)
    // console.log(decodedData);
    if (!decodedData) {
      return res.status(400).json({ message: "Session expired or no data found in session." });
    }
    const { name, email, password, userType, otp } = decodedData;

    // console.log("Session Data:", sessionData);

    if (otp === req.body.otp) {
      let image='anony.webp'
      await registerService.execute({ name, email, password, userType ,image});
      return res.status(200).json({ message: "OTP verified and registration successful" });
    } else {
      console.log('incorrect otp');
      
      return res.status(200).json({ message: "Incorrect OTP" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};




export const loginUser=async(req:Request,res:Response)=>{
  try {

    const {email,password}=req.body
    console.log(email,password);
    
    const data=await loginService.execute(email,password)

    if(data==="Email was wrong"){
      res.status(200).json({message:"Email was wrong"})
    }else if(data==="Password was wrong"){
      res.status(200).json({message:"Password was wrong"})
    }else{
      let {name,email,userType,image}=data
      let user={name:name,email:email,userType:userType,image:image}
     
      
      const token= await createToken(user,res)
      console.log(token,"token");
      

      res.status(200).json({data:user,token:token})
      
    }
    

    
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
}


export const resendUser=async(req:Request,res:Response)=>{
  try {
    
    const token =req.cookies.jwt
    console.log(token);
    
    const decoded=await verifyToken(token)
    console.log(decoded);
    const otp=generateOtp()

    const data = {
      name: decoded.name,
      email: decoded.email,
      password: decoded.password,
      userType: decoded.userType,
      otp: otp,
    };

    await createToken(data,res)
    await sendMail(decoded.email,otp,decoded.name)
    console.log(otp);

    console.log('resen send success');
    
    res.status(200).json({message:"resend otp sent success"})
    
  } catch (error:any) {
    console.log(error.message);
    
  }
}

export const googleRegister=async(req:Request,res:Response)=>{
  try {
    // console.log(req.body.data)
    const {email,displayName,photoURL}=req.body.data
    const userType=req.body.userType
    const user={email:email,name:displayName,image:photoURL,userType:userType}
    const userExists=await registerService.find(email)
   const token= await createToken(user,res)

    if(userExists){
      console.log(userExists,"user exists");
      
      res.status(200).json({user:userExists,token:token,message:"user exists"})
    }else{
      const newUser=await registerService.GoogleRegister(user)
      console.log(newUser);
      
      res.status(200).json({user:newUser,token:token,message:"create new User"})
    }

  } catch (error:any) {
    console.log(error.message);
    
  }
}