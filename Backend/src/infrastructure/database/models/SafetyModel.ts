import mongoose,{Document,Schema} from "mongoose";

export interface Safety{
    name:string,
    is_blocked:boolean
}


export interface SafetyDocument extends Safety,Document{
    _id:string
}

const SafetySchema:Schema<SafetyDocument>=new Schema({
    name:{type:String,required:true},
    is_blocked: { type: Boolean, default: false }
},{timestamps:true})

const SafetyModel=mongoose.model<SafetyDocument>("Safety",SafetySchema)
export default SafetyModel