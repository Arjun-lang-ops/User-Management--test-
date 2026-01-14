import mongoose, { mongo } from "mongoose";
import { type } from "os";
import { boolean } from "webidl-conversions";
const schema = mongoose.Schema;

const userSchema = new schema({
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
        default:'USER'
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true }
    
);

export default mongoose.model('Users',userSchema,'loggers');