import { Request,Response } from "express";
import dotenv from 'dotenv'
import { createToken } from "../../../utils/jwt";
dotenv.config()

const adminEmail=process.env.ADMIN_EMAIL
const adminPass=process.env.ADMIN_PASS

export const adminLogin=async(req:Request,res:Response)=>{
    try {

        const {email,password}=req.body
        if(email===adminEmail){
            if(password===adminPass){
                const token =await createToken({email:email,password:password},res)
                res.status(200).json({message:"success",token:token})
            }else{
                res.status(200).json({message:"passwordwrong"})
            }
        }else{
            res.status(200).json({message:"adminnotfound"})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}