import mongoose,{Document,Schema} from "mongoose";

export interface Banner{
    content:string,
    image:string,
    is_blocked:boolean
}
 
export interface BannerDocument extends Banner,Document{
    _id:string
}
 
const BannerSchema:Schema<BannerDocument>=new Schema({
    content:{type:String,required:true},
    image:{type:String,required:true},
    is_blocked: { type: Boolean, default: false }
},{timestamps:true})


const BannerModel=mongoose.model<BannerDocument>("Banner",BannerSchema)
export default BannerModel