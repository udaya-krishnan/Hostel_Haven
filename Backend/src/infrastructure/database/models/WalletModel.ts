import { LargeNumberLike } from "crypto";
import mongoose,{Document,ObjectId,Schema} from "mongoose";

export interface Wallet{
    user_Id:ObjectId,
    balance:number,
}



export interface WalletDocument extends Wallet,Document{
    _id:string
}


const WalletSchema:Schema<WalletDocument>=new Schema({
    user_Id:{type:mongoose.Types.ObjectId, ref:'User',required:true},
    balance:{type:Number,required:true}
},{timestamps:true})


const WalletModel=mongoose.model<WalletDocument>("Wallet",WalletSchema)
export default WalletModel