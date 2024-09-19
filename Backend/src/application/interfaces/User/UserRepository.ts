import { GusetInfo, User } from "../../../domain/entities/User";
import { EditUser } from "../../../domain/entities/EditUser";

export interface UserRepository {
    createUser(user:User):Promise<User>;
    findUser(user:string):Promise<any|null>;
    googleRegister(user:any):Promise<any |null>;
    forgot(email:string,password:string):Promise<any|null>
    edit(values:EditUser):Promise<any|null>
    image(name:string,email:string):Promise<any|null>
    changepassword(password:string,email:string):Promise<any|null>
    fetchhostel():Promise<any|null>
    fetchroom():Promise<any|null>
    properttdetails(id:string):Promise<any|null>
    addgusetinfo(data:GusetInfo):Promise<any|null>
    reservation(totalPrice:string,guserId:string,userId:string,proId:string,durationInMonths:string):Promise<any|null>
    payment(reservationId:string,userId:string,payment_method:string,amount:string,paymentStatus:string):Promise<any|null>
    wishlist(userId:string,proId:string):Promise<any|null>
    findWishlist(userId:string):Promise<any|null>
    fetchwishlist(id:string):Promise<any|null>
    removewish(id:string):Promise<any|null>
}