const User=require("../models/user.js")
const bcrypt=require('bcrypt')
const express=require('express');
const jwt=require('jsonwebtoken')
const {adminAuth,userAuth}=require("../middleware/auth.js")

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
   const payload={id:user._id,
    role:user.role

   }
    const token=await user.generateAuthToken();
    console.log("tokenss",token)
    res.cookie("token",token,{httpOnly:true,maxAge:360000,sameSite:'lax',secure:false});
    user.password=undefined;
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

authRouter.post('/login',async(req,res)=>{
   try {
     const {emailId,password}=req.body;
    if(!emailId || !password){
        res.status(400).json({
           message:"emailId and password is required"
        })
    }
    const user=await User.findOne({emailId});
    if(!user){
        res.status(401).json({
            message:"User does not exist",
        })
    }
    const passwordChecking=await bcrypt.compare(password,user.password);
    if(!passwordChecking){
        res.status(401).json({
            message:"Invalid credential",
        })
    }
    const token=await user.generateAuthToken();
    res.cookie("token",token,{
        httpOnly: true,
        maxAge:60*60*1000,
        sameSite:"lax",
        secure:false,

    })
    res.status(200).json({
        message:"user login sucessfully"
    })
   } catch (error) {
     res.status(500).json({
            message:"error"+error
        })
   }
})

authRouter.get("/userDetail",adminAuth,async(req,res)=>{
      try {
        console.log("inside user details")
        const {_id}=req.user;
        const user=await User.findByIdAndUpdate(_id,{emailId:"aman"});
        res.status(200).json({
            message:"user got successfully,",user
        })
      } catch (error) {
        res.status(500).json({
            message:"error"+error
        })
      }
})

module.exports=authRouter;