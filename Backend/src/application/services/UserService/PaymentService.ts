import { PaymentUseCase } from "../../../domain/usecase/User/PaymentUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";

export class PaymentService implements PaymentUseCase{
    constructor(private userRepository:UserRepository){}

    async reservation(totalPrice: string, guserId: string, userId: string, proId: string, durationInMonths: string,checkInDate:string,checkOutDate:string): Promise<any | null> {
        const res=await this.userRepository.reservation(totalPrice,guserId,userId,proId,durationInMonths,checkInDate,checkOutDate)
        return res
    }

    async payment(reservationId: string, userId: string, payment_method: string, amount: string,paymentStatus:string): Promise<any | null> {
        const res=await this.userRepository.payment(reservationId,userId,payment_method,amount,paymentStatus)
        return res
    }

    async paymentFailed(amount: string, reservationId: string, userId: string): Promise<any | null> {
        const res =await this.userRepository.paymentfailed(amount,reservationId,userId)
        return res
    }

    async fetchreservation(id: string): Promise<any | null> {
        const res=await this.userRepository.fetchreservation(id)
        return res
    }

    async bookingdetails(id: string): Promise<any | null> {
        const res=await this.userRepository.bookingdetails(id)
        return res
    }

    async retryverify(id: string): Promise<any | null> {
        const res=await this.userRepository.retrypayment(id)
        return res
    }
}