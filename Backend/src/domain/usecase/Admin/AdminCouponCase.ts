import { CouponData } from "../../entities/Coupon";

export interface AdminCouponCase{
    addcoupon(data:CouponData):Promise<any|null>
    fetchcoupon():Promise<any|null>
    actioncoupon(id:string):Promise<any|null>
    editCoupon(id:string,data:any):Promise<any|null>
}