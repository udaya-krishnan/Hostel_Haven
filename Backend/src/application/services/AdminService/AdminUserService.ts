import { AdminRepository } from "../../interfaces/Admin/AdminRepository";
import { AdminUserCase } from "../../../domain/usecase/Admin/AdminUserCase";

export class AdminUserService implements AdminUserCase{
    constructor(private adminRepository:AdminRepository){}

    async fetchingUsers(): Promise<any | null> {
        
    }
}