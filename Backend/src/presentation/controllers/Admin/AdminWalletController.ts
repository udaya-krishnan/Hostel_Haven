import { Request,Response } from "express";
import { AdminWalletService } from "../../../application/services/AdminService/AdminWalletService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";

const adminRepository=new AdminRepositoryImpl()
const adminWalletRepo=new AdminWalletService(adminRepository)


export const fetchWalletHistory=async(req:Request,res:Response)=>{
    try {
        const [wallet,transaction]=await adminWalletRepo.fetchwalletHistory()


        res.status(200).json({wallet:wallet,transaction:transaction})
    } catch (error:any) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}