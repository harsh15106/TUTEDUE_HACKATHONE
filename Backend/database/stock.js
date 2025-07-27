const  mongoose  = require("mongoose")
//creating schema
const stockSchema= new mongoose.Schema(
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
        
    },

    
    { timestamps: true}
);

module.exports = mongoose.model("stock",stockSchema);
