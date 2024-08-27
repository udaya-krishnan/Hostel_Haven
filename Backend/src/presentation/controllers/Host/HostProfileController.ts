import { Response,Request } from "express";
import { HostProfileService } from "../../../application/services/HostService/HostProfileService";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { s3Upload } from "../../../utils/S3bucket";
import { findlocation } from "../../../config/findLocation";

const hostRepository=new HostRepositoryImpl()
const hostProfileService=new HostProfileService(hostRepository)

export const hostupdateProfile=async(req:Request,res:Response)=>{
    try {

        const values=req.body.values
        const findLocation=await findlocation(req.body.values.pinCode)

        if (findLocation) {
            values.latitude = findLocation[0];
            values.longitude = findLocation[1];
          } else {
            console.log('Unable to find location.');
          }

        const update=await hostProfileService.edit(values)

        res.status(200).json({message:"userData updated",hostData:update})
        
        
    } catch (error:any){
        console.log(error.message);
        
    }
}

export const uploadImag=async(req:Request,res:Response)=>{
    try {
        const email=req.body.email
        const file=req.file
        const name =(await s3Upload(file)) as string;

        const hostData=await hostProfileService.image(name,email)        
        
        console.log(hostData);
        
        res.status(200).json({message:"profile photo updated",hostData:hostData})
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}



export const changepassword=async (req:Request,res:Response)=>{
    try {
        const password=req.body.password
        const email=req.body.email

        const response=await hostProfileService.changepassword(password,email)
        if(response){
            res.status(200).json({message:"password change success"})
        }else{
            console.log('password not changed');
            
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}