import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_DB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n ✅ MongoDB connected !! DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Faied:", error);
        process.exit(1);
    }  
}   

export default connect_DB;