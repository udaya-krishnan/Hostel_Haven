export interface FetchProperty{
    fetchamenities():Promise<any|null>
    fetchsafety():Promise<any|null>
    addproperty(data:any):Promise<any|null>
    fetchProperty(id:string):Promise<any|null>
}