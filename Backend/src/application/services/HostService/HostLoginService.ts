import { HostLoginUseCase } from "../../../domain/usecase/Host/HostLoginUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";
import bcrypt from "bcrypt"

export class HostLoginService implements HostLoginUseCase{
    constructor(private hostRepository:HostRepository){}

    async find(email: string, password: string): Promise<any | null> {
        const data=await this.hostRepository.findHost(email)
        if(data){
            if(await bcrypt.compare(password, data.password)){
                if(data.is_blocked===true){
                    console.log('account blocked');
                    
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

    async rolechange(email: string): Promise<any | null> {
        const data=await this.hostRepository.ruleChange(email)
        return data
    }

    

    
}