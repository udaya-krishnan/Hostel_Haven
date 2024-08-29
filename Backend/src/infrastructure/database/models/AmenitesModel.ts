import mongoose,{Document,Schema} from "mongoose";

export interface Amenities{
    name:string,
    is_blocked:boolean
}

export interface AmenitiesDocument extends Amenities,Document{
    _id:string
}

const AmenitiesSchema:Schema<AmenitiesDocument>=new Schema({
    name:{type:String,required:true},
    is_blocked: { type: Boolean, default: false }
},{timestamps:true})


const AmenitesModel=mongoose.model<AmenitiesDocument>("Amenities",AmenitiesSchema)
export default AmenitesModel