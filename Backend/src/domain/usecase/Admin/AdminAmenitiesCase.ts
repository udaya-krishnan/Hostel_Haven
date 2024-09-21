export interface AdminAmenities{
    addamenities(value:string):Promise<any|null>
    fetchamenities():Promise<any|null>
    actionAmenities(id:string):Promise<any|null>
    updateAmenities(id:string,name:string):Promise<any|null>
}