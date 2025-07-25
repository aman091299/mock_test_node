
const jwt=require('jsonwebtoken');
const User = require('../models/user');
const userAuth=async(req ,res,next)=>{
    try {
        console.log(req.cookies)
        let token=req.cookies?.token;
        if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token is not there" });
  }
         const decoded=await jwt.verify(token,process.env.JWT_SECRET);
          console.log("decoded",decoded)
          const user=await User.findById(decoded._id);
             console.log("user1",user)

           if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "No user founded" });
    }
    console.log("user2",user)
    req.user = user;
    
          next();
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "auth fail" + error,
    });
    }
}

const adminAuth=async(req,res,next)=>{
    try {
          let token=req.cookies?.token;
        if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token is not there" });
  }
         const decoded=await jwt.verify(token,process.env.JWT_SECRET);
         if (decoded.role !== "admin") {
    return res
      .status(403)
      .json({ sucess: false, message: "Access denied: Admins only" });
  }
  const user = await User.findById(decode._id);
  
    if (!user) {
      return res.status(401).json({ sucess: false, message: "No user founded" });
    }
    req.user = user;
    next();
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "auth fail" + error,
    });
    }
     

}
module.exports={adminAuth,userAuth};