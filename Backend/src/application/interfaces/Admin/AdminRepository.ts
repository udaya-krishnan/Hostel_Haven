
export interface AdminRepository{
    fetchingUsers():Promise<any|null>
    actionUser(id:string):Promise<any|null>
    fetchingHost():Promise<any|null>
    userDetails(id:string):Promise<any|null>
    hostDetails(id:string):Promise<any|null>
    addamenities(value:string):Promise<any|null>
    fetchamenities():Promise<any|null>
    actionAmenities(id:string):Promise<any|null>
    updateAmenities(id:string,name:string):Promise<any|null>
    addsafety(name:string):Promise<any|null>
    fetchsafety():Promise<any|null>
    actionSafety(id:string):Promise<any|null>
    updateSafety(id:string,name:string):Promise<any|null>
}