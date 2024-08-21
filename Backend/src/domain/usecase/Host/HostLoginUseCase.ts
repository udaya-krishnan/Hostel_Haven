export interface HostLoginUseCase{
    find(email:string,password:string):Promise<any|null>
    rolechange(email:string):Promise<any|null>
}