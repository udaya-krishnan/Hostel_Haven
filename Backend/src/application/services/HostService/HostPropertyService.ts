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
}