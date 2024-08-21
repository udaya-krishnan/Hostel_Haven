import { User } from "../../../domain/entities/User";

export interface UserRepository {
    createUser(user:User):Promise<User>;
    findUser(user:string):Promise<any|null>;
    googleRegister(user:any):Promise<any |null>;
}