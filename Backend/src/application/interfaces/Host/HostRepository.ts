export interface HostRepository{
    findHost(email:string):Promise<any|null>
    ruleChange(email:string):Promise<any | null>
}