import { PaymentUseCase } from "../../../domain/usecase/User/PaymentUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";

export class PaymentService implements PaymentUseCase {
    constructor(private userRepository: UserRepository) {}

    async reservation(
        totalPrice: string,
        guserId: string,
        userId: string,
        proId: string,
        durationInMonths: string,
        checkInDate: string,
        checkOutDate: string
    ): Promise<any | null> {
        try {
            const res = await this.userRepository.reservation(
                totalPrice,
                guserId,
                userId,
                proId,
                durationInMonths,
                checkInDate,
                checkOutDate
            );
            return res;
        } catch (error) {
            // Handle the error as needed
            console.error("Error during reservation:", error);
            throw new Error("Reservation failed. Please try again later.");
        }
    }

    async payment(
        reservationId: string,
        userId: string,
        payment_method: string,
        amount: string,
        paymentStatus: string
    ): Promise<any | null> {
        try {
            const res = await this.userRepository.payment(
                reservationId,
                userId,
                payment_method,
                amount,
                paymentStatus
            );
            return res;
        } catch (error) {
            console.error("Error during payment:", error);
            throw new Error("Payment processing failed. Please try again.");
        }
    }

    async paymentFailed(amount: string, reservationId: string, userId: string): Promise<any | null> {
        try {
            const res = await this.userRepository.paymentfailed(amount, reservationId, userId);
            return res;
        } catch (error) {
            console.error("Error during payment failure handling:", error);
            throw new Error("Failed to handle payment failure. Please check your details.");
        }
    }

    async fetchreservation(id: string): Promise<any | null> {
        try {
            const res = await this.userRepository.fetchreservation(id);
            return res;
        } catch (error) {
            console.error("Error fetching reservation:", error);
            throw new Error("Failed to fetch reservation. Please try again later.");
        }
    }

    async bookingdetails(id: string): Promise<any | null> {
        try {
            const res = await this.userRepository.bookingdetails(id);
            return res;
        } catch (error) {
            console.error("Error fetching booking details:", error);
            throw new Error("Failed to fetch booking details. Please try again.");
        }
    }

    async retryverify(id: string): Promise<any | null> {
        try {
            const res = await this.userRepository.retrypayment(id);
            return res;
        } catch (error) {
            console.error("Error retrying payment verification:", error);
            throw new Error("Failed to retry payment verification. Please try again.");
        }
    }

    async canceleReservation(resId: string): Promise<any | null> {
        try {
            const res = await this.userRepository.cancelResrevation(resId);
            return res;
        } catch (error) {
            console.error("Error canceling reservation:", error);
            throw new Error("Failed to cancel reservation. Please try again.");
        }
    }
}
