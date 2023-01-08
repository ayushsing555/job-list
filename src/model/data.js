const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
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
UserStructure.pre("save",async function(next){
    if(this.isModified("userName")){
    console.log(`before userName ${this.userName}`);
    this.userName = await bcrypt.hash(this.userName,10);
    console.log(`after bcrypting user is${this.userName}`);
    }
    next();
})
const User = new mongoose.model("User",UserStructure);
module.exports = User;