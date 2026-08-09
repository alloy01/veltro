import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log("DB was connected successfully");
    });
    //mongoose.connection.on works similar to event listener being added such that when the mongoose successfully connects to the database given below near the await line it logs the connection status on console.
    
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/veltro`);
    }catch (err){
        console.log("MongoDB connection failed.",err.message);
        process.exit(1);
    }
    //enter the database URI to connect with the server.
};

// we create an async function named to connect the database and also give us a response on console whether the connection was successful or not.

export {connectDB};