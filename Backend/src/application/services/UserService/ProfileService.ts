import { EditUser } from "../../../domain/entities/EditUser";
import { EditprofileUsecase } from "../../../domain/usecase/User/EditprofileUsecase";
import { UserRepository } from "../../interfaces/User/UserRepository";


export class ProfileService implements EditprofileUsecase{
    constructor (private userRepository:UserRepository){}

    async edit(values: EditUser): Promise<any | null> {
        const updateProfile=await this.userRepository.edit(values)
        return updateProfile
    }

    async image(name: string, email: string): Promise<any | null> {
        const updateImage=await this.userRepository.image(name,email)
        return updateImage
    }


}