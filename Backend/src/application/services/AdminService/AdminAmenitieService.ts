import { AdminAmenities } from "../../../domain/usecase/Admin/AdminAmenitiesCase";
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";

export class AdminAmenitieService implements AdminAmenities{
    constructor(private adminRepository:AdminRepository){}

    async addamenities(value: string): Promise<any | null> {
        const add=await this.adminRepository.addamenities(value)
        return add
    }

    async fetchamenities(): Promise<any | null> {
        const data=await this.adminRepository.fetchamenities()
        return data
    }

    async actionAmenities(id: string): Promise<any | null> {
        const action=await this.adminRepository.actionAmenities(id)
        return action
    }

    async updateAmenities(id: string, name: string): Promise<any | null> {
        const update =await this.adminRepository.updateAmenities(id,name)
        return update
    }
}