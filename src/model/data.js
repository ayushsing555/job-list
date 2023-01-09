require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

UserStructure.methods.generateToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

UserStructure.pre("save",async function(next){
    if(this.isModified("userName")){
    // console.log(`before userName ${this.userName}`);
    this.userName = await bcrypt.hash(this.userName,10);
    // console.log(`after bcrypting user is${this.userName}`);
    }
    next();
})
const User = new mongoose.model("User",UserStructure);
module.exports = User;