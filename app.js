const express=require('express');
const cookiesParser=require('cookie-parser')
require('dotenv').config();
const connectDB=require('./database/config');
const authRouter=require("./routes/auth.js");
const app=express();
// Connect to MongoDB
connectDB();

app.use(express.json())
app.use(cookiesParser());
app.get('/',(req,res)=>{
    res.send("Hello this is first route");
})
const PORT = process.env.PORT || 3000;
 app.use('/',authRouter);
 


app.listen(PORT,()=>{
    console.log(`server is listening at port  ${PORT}` )
})