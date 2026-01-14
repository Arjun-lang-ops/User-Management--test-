import mongoose from "mongoose";

const schema=mongoose.Schema;

const adminSchema= new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'ADMIN'
    }
})

export default mongoose.model('admin',adminSchema,'loggers');