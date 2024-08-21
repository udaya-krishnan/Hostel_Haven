import { HostRepository } from "../../../application/interfaces/Host/HostRepository";
import UserModel from "../../database/models/UserModel";


export class HostRepositoryImpl implements HostRepository{

    async findHost(email: string): Promise<any | null> {
        return UserModel.findOne({email:email})
    }

    async ruleChange(email: string): Promise<any | null> {
        return UserModel.findOneAndUpdate({email:email},{
            userType:"host"
        })
    }

}