import { AdminWalletCase  } from "../../../domain/usecase/Admin/AdminWalletCase";
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";


export class AdminWalletService implements AdminWalletCase{
    constructor(private adminRepository:AdminRepository){}

   async fetchwalletHistory(): Promise<any | null> {
       const [wallet,transaction]=await this.adminRepository.fetchwalletHistory()
       return [wallet,transaction]
   }
}