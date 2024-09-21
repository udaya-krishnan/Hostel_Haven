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
    image:string;
    about:string;
    location:string;
    latitude:number;
    work:string;
    pinCode:string;
    longitude:number;
    is_blocked:boolean;
}

export interface UserDocument extends User,Document{
    _id:string
}


const UserSchema:Schema<UserDocument>=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    mobile:{type:Number,required:false},
    userType: { type: String, enum: UserType, required: true },
    image:{type:String,required:false},
    about:{type:String,required:false},
    work:{type:String,required:false},
    location: { type: String, required: false },
    pinCode:{type:String,required:false},
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    is_blocked: { type: Boolean, default: false }
},{timestamps:true})


const UserModel=mongoose.model<UserDocument>("User",UserSchema)
export default UserModel