import { User } from "../entities/User";

export interface RegisterUseCase{
    execute(user:User):Promise<string>;
}