import { Data } from "../../../domain/entities/Chat";

export interface HostChatUseCase{
    fetchHostConnection(hostId:string):Promise<any|null>
    connectUser(userId:string,hostId:string,data:Data):Promise<any|null>
    fetchHostMessage(hostId:string,userId:string):Promise<any|null>
    fetchNotifications():Promise<any|null>
}