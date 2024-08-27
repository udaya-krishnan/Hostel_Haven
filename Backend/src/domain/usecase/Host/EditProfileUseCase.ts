import { EditHost } from "../../entities/EditHost";

export interface EditprofileUsecase{
    edit(values:EditHost):Promise<any|null>
    image(name:string,email:string):Promise<any|null>
    changepassword(password:string,email:string):Promise<any|null>
}