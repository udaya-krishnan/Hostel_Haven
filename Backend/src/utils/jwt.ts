import { Response } from "express";
import jwt from  "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


const JWT_AUTHCSEC =process.env.JWT_AUTHSECRET!;


export const createToken = async (data: any, res: Response) => {
    try {

      const accessToken = jwt.sign(data, JWT_AUTHCSEC, { expiresIn: '10m' });
      const refreshToken = jwt.sign(data, JWT_AUTHCSEC, { expiresIn: '15m' });
  
     
      res.cookie("accessToken", accessToken, {
        httpOnly: true,     
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",  
        maxAge: 10 * 60 * 1000 
      });
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 
      });

      return accessToken;
    } catch (error: any) {
      console.error("Error creating token:", error.message);
      throw new Error(error.message);
    }
  }

export const verifyToken=async(data:any)=>{
  try {
    const Response= jwt.verify(data,JWT_AUTHCSEC)as any
    return Response
  } catch (error:any) {
    console.log(error,"this error");
    throw error
    
  }
    
}




export const createAccess=async(data:any,res:Response)=>{
  try {
    const { exp,iat, ...payloadWithoutExp } = data;

    // Create the access token with 'expiresIn'
    const accessToken = jwt.sign(payloadWithoutExp, JWT_AUTHCSEC, { expiresIn: '3m' });

    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 30 * 60 * 1000, // 3 minutes
    // });

    console.log(accessToken,"new access token");
    

    return accessToken;
  } catch (error:any) {
    console.log(error.message);
    
  }
}