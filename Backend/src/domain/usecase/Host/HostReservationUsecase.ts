export interface HostReservationUseCase{
    actionreservation(action:string,id:string):Promise<any|null>
}