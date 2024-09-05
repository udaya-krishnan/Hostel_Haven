import { EditHost } from "../../../domain/entities/EditHost";

export interface HostRepository{
    findHost(email:string):Promise<any|null>
    ruleChange(email:string):Promise<any | null>
    edit(values:EditHost):Promise<any|null>
    image(name:string,email:string):Promise<any|null>
    changepassword(password:string,email:string):Promise<any|null>
    fetchamenities():Promise<any|null>
    fetchsafety():Promise<any|null>
    addProperty(data:any):Promise<any|null>
    fetchproperty(id:string):Promise<any|null>
}