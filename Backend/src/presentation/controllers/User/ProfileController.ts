import { Response,Request } from "express";
import { ProfileService } from "../../../application/services/UserService/ProfileService";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { s3Upload } from "../../../utils/S3bucket";
import { findlocation } from "../../../config/findLocation";



const userRepository=new UserRepositoryImpl()

const profileserivice=new ProfileService(userRepository)


export const updateProfile=async(req:Request,res:Response)=>{
    try {
        const values=req.body.values

        const findLocation=await findlocation(req.body.values.pinCode)

        if (findLocation) {
            values.latitude = findLocation[0];
            values.longitude = findLocation[1];
          } else {
            console.log('Unable to find location.');
          }

        const update=await profileserivice.edit(values)

        res.status(200).json({message:"userData updated",userData:update})
        
        
    } catch (error:any){
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const uploadImag=async(req:Request,res:Response)=>{
    try {
        const email=req.body.email
        const file=req.file
        const name =(await s3Upload(file)) as string;

        const userData=await profileserivice.image(name,email)        
        
        console.log(userData);
        
        res.status(200).json({message:"profile photo updated",userData:userData})
        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const changepassword=async (req:Request,res:Response)=>{
    try {
        const password=req.body.password
        const email=req.body.email

        const response=await profileserivice.changepassword(password,email)
        if(response){
            res.status(200).json({message:"password change success"})
        }else{
            console.log('password not changed');
            
        }
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}