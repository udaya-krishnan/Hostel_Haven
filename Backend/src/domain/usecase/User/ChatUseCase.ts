import { Data } from "../../entities/Chat"

export interface ChatUseCase{
    connectHost(userId:string,hostId:string,data:Data):Promise<any|null>
    fetchHost(hostId:string,userId:string):Promise<any|null>
    fetchConnection(userId:string):Promise<any|null>
    fetchUserMessage(hostId:string,userId:string):Promise<any|null>
    fetchNotifications():Promise<any|null>
}