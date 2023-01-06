const mongoose = require("mongoose");
const UserStructure = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{type:String,required:true},
    code:{
        type:Number,
        required:true
    },
})
const User = new mongoose.model("User",UserStructure);
module.exports = User;