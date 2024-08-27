import { UserRepository } from "../../../application/interfaces/User/UserRepository";
import { UserDocument } from "../../database/models/UserModel";
import { User } from "../../../domain/entities/User";
import UserModel from "../../database/models/UserModel";
import { EditUser } from "../../../domain/entities/EditUser";

export class UserRepositoryImpl implements UserRepository{

    async findUser(email:string): Promise<any | null>{
        return UserModel.findOne({email:email})
    }
    
    async createUser(user: User): Promise<User> {
        try {
            console.log("userdatails", user);
            const createUser: UserDocument = await UserModel.create(user);
            return createUser.toObject() as User;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async googleRegister(user: any): Promise<any | null> {
        const createUser:UserDocument =await UserModel.create(user)
        return createUser.toObject() as User
    }

    async forgot(email: string, password: string): Promise<any | null> {
        return await UserModel.findOneAndUpdate({email:email},{
            password:password
        })
        
    }

    async edit(values: EditUser): Promise<any | null> {
        console.log(values,"userrepos");
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

    
}