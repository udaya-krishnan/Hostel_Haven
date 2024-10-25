export interface AdminUserCase{
    fetchingUsers():Promise<any|null>
    actionUser(id:string):Promise<any|null>
    userDetails(id:string):Promise<any|null>
    fetch():Promise<any|null>
}