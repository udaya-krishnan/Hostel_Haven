
import mongoose,{Document,ObjectId,Schema} from "mongoose";

export interface Transaction{
    wallet_Id:ObjectId,
    amount:number,
    transaction_type:string,
}



export interface TransactionDocument extends Transaction,Document{
    _id:string
}


const TransactionSchema:Schema<TransactionDocument>=new Schema({
    wallet_Id:{type:mongoose.Types.ObjectId, ref:'Wallet',required:true},
    amount:{type:Number,required:true},
    transaction_type:{type:String,required:true}
},{timestamps:true})


const TransactionModel=mongoose.model<TransactionDocument>("Transaction",TransactionSchema)
export default TransactionModel