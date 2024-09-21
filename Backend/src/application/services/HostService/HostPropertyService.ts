import { FetchProperty } from "../../../domain/usecase/Host/fetchPropertCase";
// import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { HostRepository } from "../../interfaces/Host/HostRepository";

export class HostPropertyService implements FetchProperty{
    constructor(private hostrepository:HostRepository){}
    async fetchamenities(): Promise<any | null> {
        const data=await this.hostrepository.fetchamenities()
        return data
    }

    async fetchsafety(): Promise<any | null> {
        const data=await this.hostrepository.fetchsafety()
        return data
    }

    async addproperty(data: any): Promise<any | null> {
        const res=await this.hostrepository.addProperty(data)
        return res
    }

    async fetchProperty(id: string): Promise<any | null> {
        const res=await this.hostrepository.fetchproperty(id)
        return res
    }

    async updateproperty(data: any, id: string): Promise<any | null> {
        const res=await this.hostrepository.updateproperty(data,id)
        return res
    }

    async available(id: string): Promise<any | null> {
        const res=await this.hostrepository.available(id)
        return res
    }
    

    async fetchreservation(id: string): Promise<any | null> {
        const res=await this.hostrepository.fetchreservation(id)
        return res
    }
    
}