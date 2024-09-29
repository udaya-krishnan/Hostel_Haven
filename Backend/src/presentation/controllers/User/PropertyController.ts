import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
import { Response,Request } from "express";
import { PropertyService } from "../../../application/services/UserService/PropertyService";
import { log } from "console";

const userRepository=new UserRepositoryImpl()

const propertyerivice=new PropertyService(userRepository)

export const fetchHostel=async(req:Request,res:Response)=>{
    try {
        const search=req.body.search
        const hostels=await propertyerivice.fetchhostel(search)
        res.status(200).json({hostels:hostels})
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const fetchRoom=async(req:Request,res:Response)=>{
    try {
        const search=req.body.search
        const rooms=await propertyerivice.fetchroom(search)
        res.status(200).json({rooms:rooms})
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const propertyDetails=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id;
        const data=await propertyerivice.propertydetails(id)
        res.status(200).json({data:data})
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const wishlist=async(req:Request,res:Response)=>{
    try {
        console.log('hai herte');
        
        const {id,proId}=req.body
        console.log(id,proId,"dsjsdjsd");
        
        const wish=await propertyerivice.wishlist(id,proId)
        console.log(wish);
        if(wish.message=="remove"){
            res.status(200).json({message:"remove"})
        }else{
            res.status(200).json({message:"added"})
        }

    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const findWish=async(req:Request,res:Response)=>{
    try {
        const userId=req.body.userId
        // const proId=req.body.proId
        console.log(userId);
        
        const wish=await propertyerivice.findwish(userId)
        console.log(wish,"wish");
        
       res.status(200).json({wish:wish})
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const fetchwishlist=async(req:Request,res:Response)=>{
    try {

        console.log('wish controller');
        
        const id=req.body.id

        const  wishlist=await propertyerivice.fetchwishlist(id)
        console.log(wishlist,"wsissjsdjf");
        

        res.status(200).json({wishlist:wishlist})
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const removewish=async (req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const userId=req.body.userId

        const remove=await propertyerivice.removewish(id)
        if(remove){
            const wishlist=await propertyerivice.fetchwishlist(userId)

            res.status(200).json({wishlist:wishlist})
        }

    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const fetchwish=async(req:Request,res:Response)=>{
    try {
        const {id,userId}=req.body
        const find=await propertyerivice.fetchwish(id,userId)
        console.log(find);
        
        if(find){
            res.status(200).json({message:true})
        }else{
            res.status(200).json({message:false})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}