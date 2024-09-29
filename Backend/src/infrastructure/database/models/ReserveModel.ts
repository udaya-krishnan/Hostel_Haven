import mongoose,{Document,Mongoose,ObjectId,Schema} from "mongoose";




export enum BookingStatus{
    Pending='pending',
    Success='success',
    Canceled="canceled"
}


export interface Reservation{
    user_id:ObjectId,
    guest_info:ObjectId,
    property_id:ObjectId,
    check_in_date:string,
    check_out_date:string,
    month:string,
    total_price:string,
    coupon_id:ObjectId,
    guest_count:number,
    payment_Id:ObjectId,
    booking_status:BookingStatus,
}


export interface ReservationDocument extends Reservation,Document{
    _id:string
}



const ReservationSchema:Schema<ReservationDocument>=new Schema({
    user_id:{type:mongoose.Types.ObjectId, ref:'User',required:true},
    guest_info:{type:mongoose.Types.ObjectId,ref:'Guest',required:true},
    property_id:{type:mongoose.Types.ObjectId,ref:"Property",required:true},
    check_in_date:{type:String,required:false},
    check_out_date:{type:String,required:false},
    month:{type:String,required:false},
    total_price:{type:String,required:true},
    coupon_id:{type:String,required:false},
    payment_Id:{type:mongoose.Types.ObjectId, ref:'Payment',required:false},
    guest_count:{type:Number,required:false,default:1},
    booking_status:{ type: String,enum:BookingStatus, default: BookingStatus.Pending}
},{timestamps:true})



const ReservationModel = mongoose.model<ReservationDocument>('Reservation', ReservationSchema);
export default ReservationModel;
