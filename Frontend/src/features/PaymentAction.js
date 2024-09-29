import PaymentService from "../services/PaymentService"

export const Razorpay=(amount,guestId,userId,proId,durationInMonths,checkInDate,checkOutDate)=>async()=>{
    const response=await PaymentService.rezorpay(amount,guestId,userId,proId,durationInMonths,checkInDate,checkOutDate)
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

export const paymentFailed=(amount,reservationId,userId)=>async()=>{
    const response=await PaymentService.PaymentFailed(amount,reservationId,userId)
    return response
}


export const RetryVerify=(response,paymentId)=>async()=>{
    const res=await PaymentService.retryVerify(response,paymentId)
    return res
}