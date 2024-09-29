import { UserRepository } from "../../interfaces/User/UserRepository";
import { PropertyUseCase } from "../../../domain/usecase/User/PropertyUsecase";


export class PropertyService implements PropertyUseCase{
    constructor(private userRepository:UserRepository){}


    async fetchhostel(search:string): Promise<any | null> {
        const hostel=await this.userRepository.fetchhostel(search)
        return hostel
    }

    async fetchroom(search:string): Promise<any | null> {
        const room=await this.userRepository.fetchroom(search)
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

    async fetchwish(id: string, userId: string): Promise<any | null> {
        const data=await this.userRepository.fetchwish(id,userId)
        return data
    }
}