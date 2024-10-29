import mongoose from "mongoose";

export const connectDatabase=async()=>{
    try {
        
        await mongoose.connect("mongodb+srv://udayankrishnan36:ovBtlM17FnqqX1qI@hostelhaven.1tboy.mongodb.net/HostelHaven?retryWrites=true&w=majority&appName=HostelHaven",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        } as mongoose.ConnectOptions)

        console.log("Database connected");
        
    } catch (error) {
        console.error("Database connection error:",error)
        process.exit(1)
    }
}