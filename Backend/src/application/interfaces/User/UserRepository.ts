import { User } from "../../../domain/entities/User";
import { EditUser } from "../../../domain/entities/EditUser";

export interface UserRepository {
    createUser(user:User):Promise<User>;
    findUser(user:string):Promise<any|null>;
    googleRegister(user:any):Promise<any |null>;
    forgot(email:string,password:string):Promise<any|null>
    edit(values:EditUser):Promise<any|null>
    image(name:string,email:string):Promise<any|null>
}