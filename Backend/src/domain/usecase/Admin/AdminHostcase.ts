export interface AdminHostCase{
    fetchingHost():Promise<any|null>
    hostDetails(id:string):Promise<any|null>
    // actionUser(id:string):Promise<any|null>
}