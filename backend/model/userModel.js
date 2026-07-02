import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    description:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        required:true,
        enum:["student","educator","admin"]
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],

    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },

    isOtpVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

// createdAt: "2026-05-29T12:00:00.000Z",
// updatedAt: "2026-05-29T12:00:00.000Z"

const User=mongoose.model("User",userSchema);

export default User; //This makes the model available to other files.