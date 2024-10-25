import { Request,Response } from "express";
import { AdminBannerService } from "../../../application/services/AdminService/AdminBnnerService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";

const adminRepository=new AdminRepositoryImpl()
const adminBannerRepo=new AdminBannerService(adminRepository)


export const fetchBanner=async(req:Request,res:Response)=>{
    try {
        const allbanner=await adminBannerRepo.fetchbanner()
        res.status(200).json({allbanner:allbanner})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const editBanner=async(req:Request,res:Response)=>{
    try {
        

        let data=req.body
        console.log(data);
        
        let file=req.file

        console.log(file);
        
        
        // const update=await adminBannerRepo.editBanner()
    } catch (error:any) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
