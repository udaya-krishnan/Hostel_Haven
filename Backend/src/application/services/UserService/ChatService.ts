import { Data } from "../../../domain/entities/Chat";
import { ChatUseCase } from "../../../domain/usecase/User/ChatUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";


export class ChatService implements  ChatUseCase{
    constructor(private userRepository:UserRepository){}

    async connectHost(userId: string, hostId: string,data:Data): Promise<any | null> {
        const response=await this.userRepository.connecthost(userId,hostId,data)
        return response
    }

    async fetchHost(hostId: string): Promise<any | null> {
        try {
            const fetch=await this.userRepository.fetchHost(hostId)
            return fetch
            
        } catch (error) {
            throw error
        }
    }


    async fetchConnection(userId: string): Promise<any | null> {
        try {
            const fetch=await this.userRepository.fetchConnection(userId)
            return fetch
            
        } catch (error) {
            throw error
        }
    }
}