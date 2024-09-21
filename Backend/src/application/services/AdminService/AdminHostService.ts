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

    async fetchHostProperty(id: string): Promise<any | null> {
        const property=await this.adminRepository.fetchHostProperty(id)
        return property
    }

    async propertyDetails(id: string): Promise<any | null> {
        const property=await this.adminRepository.propertyDetails(id)
        return property
    }

    async approveproperty(id: string): Promise<any | null> {

        const property=await this.adminRepository.approveproperty(id)
        return property
        
    }
    async rejectproperty(id: string): Promise<any | null> {
        
        const property=await this.adminRepository.rejectproperty(id)
        return property
    }
}