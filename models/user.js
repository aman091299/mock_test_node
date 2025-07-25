const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
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

userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id.toString(),role:user.role},process.env.JWT_SECRET);
    return token;

}
const User=mongoose.model("ser",userSchema);
module.exports=User;