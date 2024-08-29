
export interface AdminRepository{
    fetchingUsers():Promise<any|null>
    actionUser(id:string):Promise<any|null>
    fetchingHost():Promise<any|null>
    userDetails(id:string):Promise<any|null>
    hostDetails(id:string):Promise<any|null>
    addamenities(value:string):Promise<any|null>
    fetchamenities():Promise<any|null>
    actionAmenities(id:string):Promise<any|null>
}