import { AdminRepository } from "../../interfaces/Admin/AdminRepository";
import { AdminUserCase } from "../../../domain/usecase/Admin/AdminUserCase";

export class AdminUserService implements AdminUserCase{
    constructor(private adminRepository:AdminRepository){}

    async fetchingUsers(): Promise<any | null> {
        const userData=await this.adminRepository.fetchingUsers()
        return userData
    }

    async actionUser(id: string): Promise<any | null> {
        // console.log(id,"id in service ");
        
        const action =await this.adminRepository.actionUser(id)
        return action 
    }

    async userDetails(id: string): Promise<any | null> {
        const action =await this.adminRepository.userDetails(id)
        return action
    }
}