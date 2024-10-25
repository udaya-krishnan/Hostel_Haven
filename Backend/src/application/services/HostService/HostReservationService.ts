import { HostReservationUseCase } from "../../../domain/usecase/Host/HostReservationUsecase";
import { HostRepository } from "../../interfaces/Host/HostRepository";


export class HostReservationService implements HostReservationUseCase{
    constructor(private hostrepository:HostRepository){}

    async actionreservation(action: string, id: string): Promise<any | null> {
        try {
            const data=await this.hostrepository.actionreservation(action,id)
            return data
        } catch (error) {
            throw error
        }
       
    }
}