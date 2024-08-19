import { RegisterUseCase } from "../../../domain/usecase/User/RegisterUseCase";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from 'bcrypt'


export class RegisterService implements RegisterUseCase{
    
    constructor (private userRepository:UserRepository){}

    async execute(user: User): Promise<string> {
        user.password=await bcrypt.hash(user.password,10);
        console.log(user)
        const newUser= await this.userRepository.createUser(user)
        return newUser.email
    }

    async find(email:string):Promise<any | null>{
        const emailExist=await this.userRepository.findUser(email)
        return emailExist
    }

}