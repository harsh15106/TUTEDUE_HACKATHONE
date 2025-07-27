const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    pass:     { type: String, required: true },
    address:  { type: String, required: true },
    avatar:   { type: String, default: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000" },
    identity: {
        type: String,
        default: "seller",
        enum: ["vendor"],
    },
    phone:    { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("profile", user);