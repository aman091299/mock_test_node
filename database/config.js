const mongoose=require('mongoose');

const connectDB=async ()=>{
    try {
        await  mongoose.connect(process.env.DATABASE_URL);
            console.log("DB connected sucessfully");


    } catch (error) {
        console.log("Something went wrong in db",error);

    }
          
}


module.exports=connectDB;