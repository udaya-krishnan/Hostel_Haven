import PaymentService from "../services/PaymentService"

export const Razorpay=(amount,guestId,userId,proId,durationInMonths)=>async()=>{
    const response=await PaymentService.rezorpay(amount,guestId,userId,proId,durationInMonths)
    return response
}

export const RazorpayVerify=(order,amount,reservationId,userId,paymentMethod)=>async()=>{
    const response =await PaymentService.verifyRazorpay(order,amount,reservationId,userId,paymentMethod)
    return response
}

export const AddGusetInfo=(data)=>async()=>{
    const response=await PaymentService.GuestInfo(data)
    return response
}