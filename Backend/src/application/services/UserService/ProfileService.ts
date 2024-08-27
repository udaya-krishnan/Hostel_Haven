import { EditUser } from "../../../domain/entities/EditUser";
import { EditprofileUsecase } from "../../../domain/usecase/User/EditprofileUsecase";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from 'bcrypt'


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


    async changepassword(password: string,email:string): Promise<any | null> {
        password=await bcrypt.hash(password,10);
        const changepassword=await this.userRepository.changepassword(password,email)
        return changepassword
    }

    


}