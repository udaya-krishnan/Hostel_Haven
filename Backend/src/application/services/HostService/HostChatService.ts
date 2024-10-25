import { Data } from "../../../domain/entities/Chat";
import { HostChatUseCase } from "../../../domain/usecase/Host/HostChatUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";


export class HostChatService implements  HostChatUseCase{
    constructor(private hostRepository:HostRepository){}

    async fetchHostConnection(hostId: string): Promise<any | null> {
        try {
            const fetch=await this.hostRepository.fetchHostConnection(hostId)
            return fetch
            
        } catch (error) {
            throw error
        }
    }

    async connectUser(userId: string, hostId: string, data: Data): Promise<any | null> {
        const response=await this.hostRepository.connectuser(userId,hostId,data)
        return response
    }

    async fetchHostMessage(hostId: string, userId: string): Promise<any | null> {
        try {
            const fetch=await this.hostRepository.fetchhostmessage(hostId,userId)
            return fetch
        } catch (error) {
            throw error
        }
    }

    async fetchNotifications(): Promise<any | null> {
        try {
            const fetch=await this.hostRepository.fetchNotifications()
            return fetch
        } catch (error) {
            throw error
        }
    }
}