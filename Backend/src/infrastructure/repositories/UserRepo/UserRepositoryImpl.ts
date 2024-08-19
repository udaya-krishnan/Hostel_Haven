import { UserRepository } from "../../../application/interfaces/User/UserRepository";
import { UserDocument } from "../../database/models/UserModel";
import { User } from "../../../domain/entities/User";
import UserModel from "../../database/models/UserModel";

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
    
}