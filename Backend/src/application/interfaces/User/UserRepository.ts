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
    fetchhostel(search:string):Promise<any|null>
    fetchroom(search:string):Promise<any|null>
    properttdetails(id:string):Promise<any|null>
    addgusetinfo(data:GusetInfo):Promise<any|null>
    reservation(totalPrice:string,guserId:string,userId:string,proId:string,durationInMonths:string,checkInDate:string,checkOutDate:string):Promise<any|null>
    payment(reservationId:string,userId:string,payment_method:string,amount:string,paymentStatus:string):Promise<any|null>
    wishlist(userId:string,proId:string):Promise<any|null>
    findWishlist(userId:string):Promise<any|null>
    fetchwishlist(id:string):Promise<any|null>
    removewish(id:string):Promise<any|null>
    fetchwish(id:string,userId:string):Promise<any|null>
    paymentfailed(amount:string,reservationId:string,userId:string):Promise<any|null>
    fetchreservation(id:string):Promise<any|null>
    bookingdetails(id:string):Promise<any|null>
    retrypayment(id:string):Promise<any|null>
}