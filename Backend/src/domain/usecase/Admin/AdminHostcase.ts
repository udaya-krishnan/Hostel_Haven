export interface AdminHostCase{
    fetchingHost():Promise<any|null>
    hostDetails(id:string):Promise<any|null>
    fetchHostProperty(id:string):Promise<any|null>
    propertyDetails(id:string):Promise<any|null>
    approveproperty(id:string):Promise<any|null>
    rejectproperty(id:string):Promise<any|null>
    // actionUser(id:string):Promise<any|null>
}