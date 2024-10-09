import { Response,Request } from "express";
import { razorpay, verify } from "../../../config/Razorpay";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepo/UserRepositoryImpl";
// import {  } from "../../../application/interfaces/User/UserRepository";
import { PaymentService } from "../../../application/services/UserService/PaymentService";


const userRepository=new UserRepositoryImpl()
const userService=new PaymentService(userRepository)




export const razorpayOrder=async(req:Request,res:Response)=>{
    try {
        const {amount,guestId,proId,userId,durationInMonths,checkInDate,checkOutDate}=req.body
        console.log(amount,guestId,proId,userId,durationInMonths,"amount");

        const options = {
            amount: amount * 100, 
            currency: 'INR',
            receipt: 'order_rcptid_11',
          };
          const id=await userService.reservation(amount,guestId,userId,proId,durationInMonths,checkInDate,checkOutDate)
          const order=await razorpay.orders.create(options)

          res.status(200).json({order:order,id:id})
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const verifyRazorpay=async(req:Request,res:Response)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body.order
        const userId=req.body.userId
        const payment_method=req.body.paymentMethod
        const amount=req.body.amount
        const reservationId=req.body.reservationId

        console.log(amount,reservationId,userId,payment_method,"verify");
        
        const verifing=await verify(razorpay_order_id,razorpay_payment_id,razorpay_signature)

        if(verifing?.status==='success'){
        const payment = await userService.payment(reservationId,userId,payment_method,amount,verifing.status)
            res.status(200).json({message:"payment sucess",payment:payment})
        }else if (verifing?.status==="failure"){
            const payment = await userService.payment(reservationId,userId,payment_method,amount,verifing.status)
            res.status(200).json({message :'payment faild',payment:payment})
        }
    } catch (error:any) {
        console.log(error.message );
        
    }
}



export const paymentFailed=async(req:Request,res:Response)=>{
    try {
        const {amount,reservationId,userId}=req.body
        console.log(amount,reservationId,userId);

        const response=await userService.paymentFailed(amount,reservationId,userId)

        if(response){
            res.status(200).json({message:'Payment failed'})
        }
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}


export const fetchReservation=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const data=await userService.fetchreservation(id)
        if(data){
            res.status(200).json({reservation:data})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const bookingDetails=async(req:Request,res:Response)=>{
    try {
        const id=req.body.id
        const data=await userService.bookingdetails(id)
        if(data){
            res.status(200).json({data:data})
        }
    } catch (error:any) {
        console.log(error);
        
    }
}

export const continuePayment=async(req:Request,res:Response)=>{
    try {
        const amount=req.body.amount
        const options = {
            amount: amount * 100, 
            currency: 'INR',
            receipt: 'order_rcptid_11',
          };

          const order=await razorpay.orders.create(options)

          res.status(200).json({order:order})

    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const RetryVerify=async(req:Request,res:Response)=>{
    try {
        const{response,paymentId}=req.body
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response

        const verifing=await verify(razorpay_order_id,razorpay_payment_id,razorpay_signature)

        if(verifing?.status==='success'){
            const data=await userService.retryverify(paymentId)
            res.status(200).json({message:"payment sucess",data:data})
        }
    } catch (error:any) {
        console.log(error.message);
        
    }
}


