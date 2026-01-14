import mongoose from "mongoose";
const connectDB= async ()=>{
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/loggers');
        console.log('MongoDB is connected successfully');
        
    }

    catch(error){

        console.error('MongoDB connection failed',error.message);
        process.exit(1);

    };
};

export default connectDB;