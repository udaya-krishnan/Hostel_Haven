import { AdminRepository } from "../../../application/interfaces/Admin/AdminRepository";
import UserModel from "../../database/models/UserModel";

export class AdminRepositoryImpl implements AdminRepository{

    async fetchingUsers(): Promise<any | null> {
        const userData=await UserModel.find({userType:'user'}).select('-password');
        return userData
    }
}