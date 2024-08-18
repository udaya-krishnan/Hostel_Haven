import { User } from "../entities/User";

export interface FinduserUseCase{
    find(email:string):Promise<any | null>;
}