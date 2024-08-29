import { AdminRepository } from "../../interfaces/Admin/AdminRepository";
import { AdminHostCase } from "../../../domain/usecase/Admin/AdminHostcase";


export class AdminHostService implements AdminHostCase{
    constructor(private adminRepository:AdminRepository){}
    async fetchingHost(): Promise<any | null> {
        const hostData=await this.adminRepository.fetchingHost()
        return hostData
    }

    async hostDetails(id: string): Promise<any | null> {
        const hostData=await this.adminRepository.hostDetails(id)
        return hostData
    }
}