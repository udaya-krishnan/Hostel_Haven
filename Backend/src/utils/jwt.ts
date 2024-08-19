import { Response } from "express";
import jwt from  "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


const JWT_AUTHCSEC =process.env.JWT_AUTHSECRET!;


export const createToken = async (data: any, res: Response) => {
    try {
      // Ensure data is an object
     
  
      // Correct format for expiresIn: '30m'
      const token = jwt.sign(data, JWT_AUTHCSEC, { expiresIn: "30m" });
  
      console.log(token, "created token");
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        maxAge: 3600000, // 1 hour in milliseconds
        sameSite: 'strict', // Helps prevent CSRF attacks
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