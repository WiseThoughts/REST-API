require("dotenv").config();
const mongoose = require("mongoose");

const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Success")
    }catch(error){
        console.log("connection error", error)
    }
}

connection();