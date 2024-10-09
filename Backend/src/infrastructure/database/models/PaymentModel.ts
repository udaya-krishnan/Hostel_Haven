import mongoose,{Document,ObjectId,Schema} from "mongoose";




export enum PaymentStatus{
    USER='user',
    HOST='host'
}

export interface Payment{
    reservation_id:ObjectId,
    user_id:ObjectId,
    payment_method:string,
    payment_status:string,
    amount:string
    payment_date:Date
}

export interface PaymentDocument extends Payment,Document{
    _id:string
}



const PaymentSchema:Schema<PaymentDocument>=new Schema({
    reservation_id:{type:mongoose.Types.ObjectId, ref:'Reservation',required:true},
    user_id:{type:mongoose.Types.ObjectId, ref:'User',required:true},
    payment_method:{type:String,required:true},
    payment_status:{type:String,required:true},
    amount:{type:String,required:true},
    payment_date:{type:Date,required:true,default: Date.now()}
},{timestamps:true})


const PaymentModel = mongoose.model<PaymentDocument>('Payment', PaymentSchema);
export default PaymentModel;


