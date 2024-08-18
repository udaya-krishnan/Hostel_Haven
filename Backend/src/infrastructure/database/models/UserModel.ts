import mongoose,{Decimal128, Document,Schema} from "mongoose";


export enum UserType{
    USER='user',
    HOST='host'
}

export interface User {
    name:string;
    email:string;
    password:string;
    mobile:number;
    userType:UserType ;
    address:string;
    latitude:number;
    longitude:number;
    is_blocked:boolean;
}

export interface UserDocument extends User,Document{
    _id:string
}


const UserSchema:Schema<UserDocument>=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:false},
    userType: { type: String, enum: UserType, required: true },
    address: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    is_blocked: { type: Boolean, default: false }
},{timestamps:true})


const UserModel=mongoose.model<UserDocument>("User",UserSchema)
export default UserModel