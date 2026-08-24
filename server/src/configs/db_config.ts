import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database was connected successfully');
    });
    // To log the status of 'connection' to database on console

    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/veltro`);
    }
    catch(err){
        if(err instanceof Error){
            console.error('Database connection failed', err.message);
            process.exit(1);
            // Exiting so that our server doesn't keep running with a failed database
        }
        else{
            console.error(`Unknown error: ${err}`);
        }   
    }
}

export default connectDB;