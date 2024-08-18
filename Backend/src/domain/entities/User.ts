import { UserType } from "../../infrastructure/database/models/UserModel";

export interface User{
    name:string;
    email:string;
    password:string;
    userType:UserType;
}

