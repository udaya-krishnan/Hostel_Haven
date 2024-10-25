import { Data } from "../../../domain/entities/Chat";
import { ChatUseCase } from "../../../domain/usecase/User/ChatUseCase";
import { UserRepository } from "../../interfaces/User/UserRepository";


export class ChatService implements  ChatUseCase{
    constructor(private userRepository:UserRepository){}

    async connectHost(userId: string, hostId: string,data:Data): Promise<any | null> {
        const response=await this.userRepository.connecthost(userId,hostId,data)
        return response
    }

    async fetchHost(hostId: string,userId:string): Promise<any | null> {
        try {
            const {fetch,message}=await this.userRepository.fetchHost(hostId,userId)
            return {fetch,message}
            
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

    async fetchUserMessage(hostId: string, userId: string): Promise<any | null> {
        try {
            const fetch=await this.userRepository.fetchusermessage(hostId,userId)
            return fetch
        } catch (error) {
            throw error
        }
    }


    async fetchNotifications(): Promise<any | null> {
        try {
            const fetch=await this.userRepository.fetchNotifications()
            return fetch
        } catch (error) {
            throw error
        }
    }
}