import { EditUser } from "../../entities/EditUser";

export interface EditprofileUsecase{
    edit(values:EditUser):Promise<any|null>
    image(name:string,email:string):Promise<any|null>
}