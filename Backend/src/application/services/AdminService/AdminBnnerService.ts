import { AdminBanner } from "../../../domain/usecase/Admin/AdminBannerCase";
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";


export class AdminBannerService implements AdminBanner {
    constructor(private adminRepository:AdminRepository){}
    async fetchbanner(): Promise<any | null> {
        const response=await this.adminRepository.fetchBanner()
        return response
    }

    async editBanner(id: string, data: any): Promise<any | null> {
        const response=await this.adminRepository.editBanner(id,data)
        return response
    }
}