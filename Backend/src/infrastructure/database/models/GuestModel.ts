import mongoose,{Document,Schema} from "mongoose";

export interface Guest{
    firstName:string,
    lastName:string,
    email:string,
    mobile:string,  
}



export interface GuestDocument extends Guest,Document{
    _id:string
}


const GusetSchema:Schema<GuestDocument>=new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true}
},{timestamps:true})


const GuestModel=mongoose.model<GuestDocument>("Guest",GusetSchema)
export default GuestModel