import { HostRepository } from "../../../application/interfaces/Host/HostRepository";
import { EditHost } from "../../../domain/entities/EditHost";
import UserModel from "../../database/models/UserModel";
import AmenitesModel from "../../database/models/AmenitesModel";
import SafetyModel from "../../database/models/SafetyModel";


export class HostRepositoryImpl implements HostRepository{

    async findHost(email: string): Promise<any | null> {
        return UserModel.findOne({email:email})
    }

    async ruleChange(email: string): Promise<any | null> {
        return UserModel.findOneAndUpdate({email:email},{
            userType:"host"
        }
        ,{ new:true }
    ).select('-password');
    }

    async edit(values: EditHost): Promise<any | null> {
        return await UserModel.findOneAndUpdate(
            { email: values.email },
            { $set: values },    
            { new: true }        
          ).select('-password');
    }

    async image(name: string,email:string): Promise<any | null> {
        return await UserModel.findOneAndUpdate(
            {email:email},
            {$set:{
                image:name
            }},
            {new:true}
        ).select('-password');
    }

    async changepassword(password: string,email:string): Promise<any | null> {
        return await UserModel.findOneAndUpdate(
            {email:email},
            {$set:{password:password}}
        )
    }

    async fetchamenities(): Promise<any | null> {
        return await AmenitesModel.find({is_blocked:false})
    }

    async fetchsafety(): Promise<any | null> {
        return await SafetyModel.find({is_blocked:false})
        
    }

}