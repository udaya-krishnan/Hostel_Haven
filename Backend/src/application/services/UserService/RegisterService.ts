import { RegisterUseCase } from "../../../domain/usecase/User/RegisterUseCase";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from 'bcrypt'


export class RegisterService implements RegisterUseCase{
    
    constructor (private userRepository:UserRepository){}

    async execute(user: User): Promise<any|null> {
        user.password=await bcrypt.hash(user.password,10);
        console.log(user)
        const newUser= await this.userRepository.createUser(user)
        return newUser
    }

    async find(email:string):Promise<any | null>{
        const emailExist=await this.userRepository.findUser(email)
        return emailExist
    }


    async GoogleRegister(user:any):Promise<any|null>{
        const newUser=await this.userRepository.googleRegister(user)
        return newUser
    }

    async forgotpass(email:string,password:string):Promise<any|null>{
        const byripassword=await bcrypt.hash(password,10);
        const update=await this.userRepository.forgot(email,byripassword)

        return update
    }
    

}