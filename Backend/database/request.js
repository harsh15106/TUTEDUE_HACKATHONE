const  mongoose  = require("mongoose")
//creating schema
const requestSchema= new mongoose.Schema(
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
            type : String,
            required: true,

        },
        location:{
            type:String,
        },
        status:{
            type:String,
            enum: ["Open","Resolved"],
            default:"Open",
        },
        createdAt:{
            type:Date,
            deafult:Date.now
        }
    },

    
    { timestamps: true}
);

module.exports = mongoose.model("request",requestSchema);
