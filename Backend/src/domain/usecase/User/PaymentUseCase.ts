export interface PaymentUseCase{
    reservation(totalPrice: string, guserId: string, userId: string, proId: string, durationInMonths: string,checkInDate:string,checkOutDate:string): Promise<any | null>
    payment(reservationId: string, userId: string, payment_method: string, amount: string,paymentStatus:string): Promise<any | null>
    paymentFailed(amount:string,reservationId:string,userId:string):Promise<any|null>
    fetchreservation(id:string):Promise<any|null>
    bookingdetails(id:string):Promise<any|null>
    retryverify(id:string):Promise<any|null>
    canceleReservation(resId:string):Promise<any|null>
}