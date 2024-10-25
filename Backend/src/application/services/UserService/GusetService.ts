import { Guset } from "../../../domain/usecase/User/GusetInfoUseCase";
import { GusetInfo } from "../../../domain/entities/User";
import { UserRepository } from "../../interfaces/User/UserRepository";


export class GusetService implements  Guset{
    constructor(private userRepository:UserRepository){}

    async addinfo(data: GusetInfo): Promise<any | null> {
        try {
            const newData=await this.userRepository.addgusetinfo(data)
            return newData
            
        } catch (error) {
            throw error
        }
       
    }
}