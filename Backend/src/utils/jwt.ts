
import jwt from  "jsonwebtoken"


const JWT_AUTHCSEC =process.env.JWT_AUTHSECRET!;

export const createToken=(data:string)=>{
    return jwt.sign(data,JWT_AUTHCSEC,{expiresIn:"1hr"})
}