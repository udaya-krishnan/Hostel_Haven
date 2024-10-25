import { PaymentUseCase } from "../../../domain/usecase/Host/HostPayementUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";

export class HostPaymentService implements PaymentUseCase {
    constructor(private hostRepository: HostRepository) {}

    async fetchPayment(id: string): Promise<any | null> {
        try {
            const [findWallet, allTransactions] = await this.hostRepository.fetchpayment(id);
            return [findWallet, allTransactions];
        } catch (error) {
            console.error("Error fetching payment details:", error);
            throw new Error("Failed to fetch payment details. Please try again later.");
        }
    }

    async addamount(hostId: string, amount: number): Promise<any | null> {
        try {
            const walletId = await this.hostRepository.addAmount(hostId, amount);
            return walletId;
        } catch (error) {
            console.error("Error adding amount to wallet:", error);
            throw new Error("Failed to add amount to wallet. Please try again later.");
        }
    }
}
