import { EditHost } from "../../../domain/entities/EditHost";
import { Data } from "../../../domain/entities/Chat";
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
    updateproperty(data:any,id:string):Promise<any|null>
    available(id:string):Promise<any|null>
    fetchreservation(id:string):Promise<any|null>
    actionreservation(action:string,id:string):Promise<any|null>
    fetchpayment(id:string):Promise<any|null>
    addAmount(hostId:string,amount:number):Promise<any|null>
    fetchHostConnection(hostId:string):Promise<any|null>
    connectuser(userId:string,hostId:string,data:Data):Promise<any|null>
    fetchhostmessage(hostId:string,userId:string):Promise<any|null>
    fetchRating(proId:string):Promise<any|null>
    fetchNotifications():Promise<any|null>
}