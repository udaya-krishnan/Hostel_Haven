import mongoose from "mongoose";

export const connectDatabase=async()=>{
    try {
        
        await mongoose.connect("mongodb://localhost:27017/Hostel_Haven",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        } as mongoose.ConnectOptions)

        console.log("Database connected");
        
    } catch (error) {
        console.error("Database connection error:",error)
        process.exit(1)
    }
}