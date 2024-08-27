import { EditHost } from "../../../domain/entities/EditHost";
import { EditprofileUsecase } from "../../../domain/usecase/Host/EditProfileUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";
import bcrypt from 'bcrypt'

export class HostProfileService implements EditprofileUsecase{
    constructor (private hostRepository:HostRepository){}

    async edit(values: EditHost): Promise<any | null> {
        const updateProfile=await this.hostRepository.edit(values)
        return updateProfile
    }
    async image(name: string, email: string): Promise<any | null> {
        const updateImage=await this.hostRepository.image(name,email)
        return updateImage
    }

    async changepassword(password: string,email:string): Promise<any | null> {
        password=await bcrypt.hash(password,10);
        const changepassword=await this.hostRepository.changepassword(password,email)
        return changepassword
    }
}
