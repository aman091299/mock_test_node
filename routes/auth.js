const User=require("../models/user.js")
const bcrypt=require('bcrypt')
const express=require('express');

const authRouter=express.Router();

authRouter.post('/signup',async(req,res)=>{
    try {
        
         console.log("inside /signup controller")
   const {emailId,name,password,dob,gender,role}=req.body;
   if(!emailId || !password || !name){
   return  res.status(400).json({
        message:"Emaild Id ,name and password is required ",
    })
   }
   const userExist=await User.findOne({emailId});
   if(userExist){
   return  res.status(401).json({
        success: false,
    message: "User already exists"
    })
   }
   const salt=12;
   const hashPassword=await bcrypt.hash(password,salt);
    const user =await User.create({
        emailId,
        password:hashPassword,name,role,gender,dob
    })
   
   return res.status(200).json({
    user:user,
    message:"user sucsessfully resgistered"
   })
    } catch (error) {
        res.status(500).json({
            message:"error"+error
        })
    }
   
})

module.exports=authRouter;