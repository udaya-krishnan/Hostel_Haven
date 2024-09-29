import { Request, Response } from "express";
import { RegisterService } from "../../../application/services/UserService/RegisterService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { generateOtp } from "../../../utils/otp"; 
import sendMail from "../../../utils/sendMail";
import { createToken, verifyToken } from "../../../utils/jwt";
import { UserEntities } from "../../../domain/entities/User";
import dotenv from 'dotenv'
import { LoginService } from "../../../application/services/UserService/LoginService";
import { addAbortListener } from "events";
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
            message:"register"
          };

          console.log('data from the register');
          
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
    const token = req.cookies.accessToken
    // console.log(token);
    const decodedData = await verifyToken(token)
    console.log("decodeddd ddddatarr",decodedData);
    
    if (!decodedData) {
      return res.status(400).json({ message: "Session expired or no data found in session." });
    }
    if(decodedData.message==="register"){
     
      const { name, email, password, userType, otp } = decodedData;

      if (otp === req.body.otp) {
        console.log('inseid the if condintion');
        
        let image='anony.webp'
        const userData=await registerService.execute({ name, email, password, userType ,image});
        console.log(userData,"userdata djdsfjdsdfsdfsfsfssfsfsfdfdddddddddddddddddd");
        let obj={
          email:email,
          userType:'user'
        }
        const token =await createToken(obj,res)
        console.log(userData,"user data dfkjfkdhsdkfhsdfhsdjkh");
        
        return res.status(200).json({ message: "OTP verified and registration successful",userData:userData,token:token });
      } else {
        console.log('incorrect otp');
        
        return res.status(200).json({ message: "Incorrect OTP" });
      }
    }else if(decodedData.message==="forgot"){
      const {otp,email,password,userType,name}=decodedData;
      if(req.body.otp===otp){
        console.log('verify the otp');
        
        return res.status(200).json({message:"Otp verified "})
      }else{
        return res.status(200).json({message:"Incorrect OTP"})
      }
    }
    // console.log(decodedData);
    
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
    }else if(data==="Account blocked"){
      res.status(200).json({message:"Account Blocked"})
    }else{
      let {name,email,userType,image,mobile,about,location,work,pinCode,_id}=data
      let user={name:name,email:email,userType:userType,image:image,mobile:mobile,about:about,location:location,work:work,pinCode:pinCode,_id:_id}
     
      
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

    console.log('resend otp controller from the user');
    
    
    const token =req.cookies.accessToken
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
      message:decoded.message
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

export const verifyemail=async(req:Request,res:Response)=>{
  try {
    const email=req.body.email
    const userExits=await registerService.find(email)
    if(userExits){
      const otp=generateOtp()

      const data={
        otp:otp,
        email:userExits.email,
        name:userExits.name,
        password:userExits.password,
        userType:userExits.userType,
        message:"forgot"
      }
      console.log(data);
      
      await createToken(data,res)
      await sendMail(data.email,otp,data.name)
      console.log(otp);


      res.status(200).json({message:'otp send success'})

    }else{
      res.status(200).json({message:'usernotfound'})
    }
    
  } catch (error:any) {
    console.log(error.message);
    
  }
}

export const forgotPassword=async(req:Request,res:Response)=>{
  try {
    const data=req.body.data
    const token=req.cookies.accessToken
    const decoded=await verifyToken(token)

   await registerService.forgotpass(decoded.email,data.newPassword)

   res.status(200).json({message:"password updated"})

    
  } catch (error:any) {
    console.log(error.message);
    
  }
}