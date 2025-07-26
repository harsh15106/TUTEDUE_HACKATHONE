const  mongoose  = require("mongoose")
//creating schema
const historySchema= new mongoose.Schema(
    {
        price:{
            type: Number,
            required: true,
        },
        product:{
            type : String,
            required: true,
        },
        quantity:{
            type : Number,
            required: true,
        },
        name:{
            type:String,
            required: true,
        }
        
    },

    
    { timestamps: true}
);

module.exports = mongoose.model("history",historySchema);
