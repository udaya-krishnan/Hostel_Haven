export interface AdminSafety{
    addSafety(name:string):Promise<any|null>
    fetchSafety():Promise<any|null>
    actionsafety(id:string):Promise<any|null>
    updatesafety(id:string,name:string):Promise<any|null>
}