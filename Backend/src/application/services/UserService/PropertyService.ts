import { UserRepository } from "../../interfaces/User/UserRepository";
import { PropertyUseCase } from "../../../domain/usecase/User/PropertyUsecase";


export class PropertyService implements PropertyUseCase{
    constructor(private userRepository:UserRepository){}


    async fetchhostel(): Promise<any | null> {
        const hostel=await this.userRepository.fetchhostel()
        return hostel
    }

    async fetchroom(): Promise<any | null> {
        const room=await this.userRepository.fetchroom()
        return room
    }

    async propertydetails(id: string): Promise<any | null> {
        const data=await this.userRepository.properttdetails(id)
        return data
    }

    async wishlist(userId: string, proId: string): Promise<any | null> {
        const data=await this.userRepository.wishlist(userId,proId)
        return data
    }

    async findwish(userId:string): Promise<any | null> {
        const data=await this.userRepository.findWishlist(userId)
        return data
    }

    async fetchwishlist(id: string): Promise<any | null> {
        const data=await this.userRepository.fetchwishlist(id)
        return data
    }

    async removewish(id: string): Promise<any | null> {
        const data =await this.userRepository.removewish(id)
        return data
    }
}