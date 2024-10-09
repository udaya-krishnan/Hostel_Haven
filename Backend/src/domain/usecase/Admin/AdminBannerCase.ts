export interface AdminBanner{
    fetchbanner():Promise<any|null>
    editBanner(id:string,data:any):Promise<any|null>
}