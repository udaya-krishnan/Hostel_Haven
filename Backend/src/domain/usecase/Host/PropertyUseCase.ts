export interface PropertyUseCase{
    addproperty(data:any):Promise<any|null>
    fetchProperty(id:string):Promise<any|null>
    updateproperty(data:any,id:string):Promise<any|null>
}