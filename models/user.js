const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
         enum: ["male", "female", "other"],
    },
    role:{
        type:String,
         enum:['student','instructor','admin'],
         default:"student"
    }
},{
    timestamps:true,
})

const User=mongoose.model("ser",userSchema);
module.exports=User;