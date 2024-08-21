import { Response } from "express";
import jwt from  "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


const JWT_AUTHCSEC =process.env.JWT_AUTHSECRET!;


export const createToken = async (data: any, res: Response) => {
    try {
      const token = jwt.sign(data, JWT_AUTHCSEC, { expiresIn: "30m" });
  
      console.log(token, "created token");
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 180000, 
        sameSite: 'strict', 
      });

      return token;
    } catch (error: any) {
      console.error("Error creating token:", error.message);
      throw new Error(error.message);
    }
  }

export const verifyToken=(data:any)=>{
    return jwt.verify(data,JWT_AUTHCSEC)as any
}