import { UserType } from "../../infrastructure/database/models/UserModel";

export interface User{
    name:string;
    email:string;
    password:string;
    userType:string;
    image:string
}


export interface UserEntities{
    name?:string,
    email?:string,
    userType?:string,
}
