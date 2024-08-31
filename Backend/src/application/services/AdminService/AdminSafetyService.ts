import { AdminSafety } from "../../../domain/usecase/Admin/AdminSafety";
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";

export class AdminSafetyService implements AdminSafety{
    constructor(private adminRepository:AdminRepository){}

    async addSafety(name: string): Promise<any | null> {
        const add=await this.adminRepository.addsafety(name)
        return add
    }

    async fetchSafety(): Promise<any | null> {
        const data=await this.adminRepository.fetchsafety()
        return data
    }

    async actionsafety(id: string): Promise<any | null> {
        const action=await this.adminRepository.actionSafety(id)
        return action
    }

    async updatesafety(id: string, name: string): Promise<any | null> {
        const update=await this.adminRepository.updateSafety(id,name)
        return update
    }
}