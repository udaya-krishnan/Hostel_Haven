import mongoose,{Document,Schema} from "mongoose";

export interface Coupon{
    code:string,
    name:string,
    expdate:string,
    min:string,
    max:string,
    is_blocked:boolean
}



export interface CouponDocument extends Coupon,Document{
    _id:string
}


const CouponSchema:Schema<CouponDocument>=new Schema({
    code:{type:String,required:true},
    name:{type:String,required:true},
    expdate:{type:String,required:true},
    min:{type:String,required:true},
    max:{type:String,required:true},
    is_blocked:{type:Boolean,default:false}
},{timestamps:true})


const CouponModel=mongoose.model<CouponDocument>("Coupon",CouponSchema)
export default CouponModel