import { LoginUseCase } from "../../../domain/usecase/User/LoginUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from "bcrypt";


export class LoginService implements LoginUseCase{
    constructor(private userRepository:UserRepository){}

    async execute(email:string,password:string): Promise<any | null> {
        const data=await this.userRepository.findUser(email)
        if(data){
            if(await bcrypt.compare(password, data.password)){
                if(data.is_blocked===true){
                    return "Account blocked"
                }else{

                    return data
                }
            }else{
                return "Password was wrong"
            }
        }else{
           return "Email was wrong"
        }
        
    }
}