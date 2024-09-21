import { PaymentUseCase } from "../../../domain/usecase/User/PaymentUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";

export class PaymentService implements PaymentUseCase{
    constructor(private userRepository:UserRepository){}

    async reservation(totalPrice: string, guserId: string, userId: string, proId: string, durationInMonths: string): Promise<any | null> {
        const res=await this.userRepository.reservation(totalPrice,guserId,userId,proId,durationInMonths)
        return res
    }

    async payment(reservationId: string, userId: string, payment_method: string, amount: string,paymentStatus:string): Promise<any | null> {
        const res=await this.userRepository.payment(reservationId,userId,payment_method,amount,paymentStatus)
        return res
    }
}