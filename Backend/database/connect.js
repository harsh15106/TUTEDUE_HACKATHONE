const mongoose = require("mongoose");
//connecting ot database
const conn= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/newFoodApp");
        console.log("Database connected");

    }
    catch(error){
        console.log(error);
    }
};
conn();