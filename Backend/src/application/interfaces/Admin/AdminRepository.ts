import { CouponData } from "../../../domain/entities/Coupon"
import { NotificationData } from "../../../domain/entities/Notification"

export interface AdminRepository{
    fetchingUsers():Promise<any|null>
    actionUser(id:string):Promise<any|null>
    fetchingHost():Promise<any|null>
    userDetails(id:string):Promise<any|null>
    hostDetails(id:string):Promise<any|null>
    addamenities(value:string):Promise<any|null>
    fetchamenities():Promise<any|null>
    actionAmenities(id:string):Promise<any|null>
    updateAmenities(id:string,name:string):Promise<any|null>
    addsafety(name:string):Promise<any|null>
    fetchsafety():Promise<any|null>
    actionSafety(id:string):Promise<any|null>
    updateSafety(id:string,name:string):Promise<any|null>
    fetchHostProperty(id:string):Promise<any|null>
    propertyDetails(id:string):Promise<any|null>
    approveproperty(id:string):Promise<any|null>
    rejectproperty(id:string):Promise<any|null>
    addcoupon(data:CouponData):Promise<any|null>
    fetchcoupon():Promise<any|null>
    actioncoupon(id:string):Promise<any|null>
    editCoupon(id:string,data:any):Promise<any|null>
    fetchBanner():Promise<any |null>
    editBanner(id:string,data:any):Promise<any|null>
    fetchwalletHistory():Promise<any|null>
    fetch():Promise<any|null>
    fetchRating():Promise<any|null>
    sendNotification(data:NotificationData):Promise<any|null>
}