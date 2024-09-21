export interface PaymentUseCase{
    reservation(totalPrice: string, guserId: string, userId: string, proId: string, durationInMonths: string): Promise<any | null>
    payment(reservationId: string, userId: string, payment_method: string, amount: string,paymentStatus:string): Promise<any | null>
}