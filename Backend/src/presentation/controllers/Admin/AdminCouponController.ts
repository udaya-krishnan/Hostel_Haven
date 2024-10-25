import { Request,Response } from "express";
import { AdminCouponService } from "../../../application/services/AdminService/AdminCouponService";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/AdminRepo/AdminRepositoryImpl";
import { generateCouponCode } from "../../../utils/CouponCode";

const adminRepository=new AdminRepositoryImpl()
const adminCouponRepo=new AdminCouponService(adminRepository)



export const addcoupon=async(req:Request,res:Response)=>{
    try {
        const data=req.body.data
        const couponCode=generateCouponCode()
        data.code=couponCode
        console.log(data);
        
        const allcoupon=await adminCouponRepo.addcoupon(data)
        res.status(200).json({allcoupon:allcoupon,message:"coupon created"})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchCoupon=async(req:Request,res:Response)=>{
    try {
        const allcoupons=await adminCouponRepo.fetchcoupon()
        res.status(200).json({allcoupons:allcoupons})
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const actionCoupon=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        console.log('coupon id',id);
        
        const action=await adminCouponRepo.actioncoupon(id)
        if(action){
            console.log("response sent");
            
            res.status(200).json({message:"success"})
        }
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const editCoupon=async(req:Request,res:Response)=>{
    try {
        const {id,data}=req.body
        console.log(id,data);

        const edit=await adminCouponRepo.editCoupon(id,data)

        if(edit){

            console.log('success');
            
            res.status(200).json({message:"edited success"})
        }
        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}