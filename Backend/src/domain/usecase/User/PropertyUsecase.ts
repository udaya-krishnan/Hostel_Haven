export interface PropertyUseCase{
    fetchhostel(search:string):Promise<any|null>
    fetchroom(search:string):Promise<any|null>
    propertydetails(id:string):Promise<any|null>
    wishlist(userId:string,proId:string):Promise<any|null>
    findwish(userId:string):Promise<any|null>
    fetchwishlist(id:string):Promise<any|null>
    removewish(id:string):Promise<any|null>
    fetchwish(id:string,userId:string):Promise<any|null>
}