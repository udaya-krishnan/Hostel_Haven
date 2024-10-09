import { PaymentUseCase } from "../../../domain/usecase/Host/HostPayementUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";
// import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";

export class HostPaymentService implements PaymentUseCase{
    constructor(private hostRepository:HostRepository){}

    async fetchPayment(id: string): Promise<any | null> {
        const [findwallet,allTransactions]=await this.hostRepository.fetchpayment(id)
        return [findwallet,allTransactions]
    }

    async addamount(hostId: string, amount: number): Promise<any | null> {
        const walletId=await this.hostRepository.addAmount(hostId,amount)
        return walletId
    }
}