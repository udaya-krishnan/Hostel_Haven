export interface PropertyUseCase{
    fetchhostel():Promise<any|null>
    fetchroom():Promise<any|null>
    propertydetails(id:string):Promise<any|null>
    wishlist(userId:string,proId:string):Promise<any|null>
    findwish(userId:string):Promise<any|null>
    fetchwishlist(id:string):Promise<any|null>
    removewish(id:string):Promise<any|null>
}