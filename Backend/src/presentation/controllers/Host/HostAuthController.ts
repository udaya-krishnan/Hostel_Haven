import { Response,Request } from "express";
import { HostLoginService } from "../../../application/services/HostService/HostLoginService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { generateOtp } from "../../../utils/otp";
import sendMail from "../../../utils/sendMail";
import { createToken,verifyToken } from "../../../utils/jwt";
import { emit } from "process";


const hostRepository=new HostRepositoryImpl();
const loginService=new HostLoginService(hostRepository)


export const verifyhost=async(req:Request,res:Response)=>{
    try {
        console.log("verify host");
        const{email,password}=req.body
        const hostexists=await loginService.find(email,password)
        if(hostexists==="Email was wrong"){
            res.status(200).json({message:"Email was wrong"})
            
        }else if(hostexists==="Password was wrong"){
            res.status(200).json({message:"Password was wrong"})
        }else{
            const otp=generateOtp()
            const data={
                name:hostexists.name,
                email:email,
                password:password,
                otp:otp
            };
            const token=await createToken(data,res)
            await sendMail(email,otp,hostexists.name)

            return res.status(200).json({message:"otp send success"})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const verifyOtp=async(req:Request,res:Response)=>{
    try {
        console.log("verify otp controller")
        const token =req.cookies.jwt
        const decoded=await verifyToken(token)
        console.log(decoded,"decodec");
        
        if(decoded.otp===req.body.otp){
            const data=await loginService.rolechange(decoded.email)
            const {email,password}=decoded
            const tokenCreate=await createToken({email:email,password:password},res)
            
                console.log('token created');
                
            res.status(200).json({host:decoded,token:tokenCreate,message:"verifyed host"})
        }else{
            res.status(200).json({message:"incorrect otp"})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const resendHost=async(req:Request,res:Response)=>{
    try {

        const token=req.cookies.jwt

        console.log(token)
        const decoded=await verifyToken(token)
        console.log(decoded);
        
        const otp=generateOtp()

        const data={
            name:decoded.name,
            email:decoded.password,
            password:decoded.password
        }
        await createToken(data,res)
        await sendMail(decoded.email,otp,decoded.name)

        res.status(200).json({message:"resend otp send successfull"})
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}