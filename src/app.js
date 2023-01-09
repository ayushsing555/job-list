require("dotenv").config()
const express=require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app=express();
require("../src/db/conn");
const User = require("../src/model/data");
const path=require("path");
const hbs=require("hbs");
const port=process.env.PORT || 3000;
const statis_path=path.join(__dirname,"../public");
const temp_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");
app.set("views",temp_path);
hbs.registerPartials(partial_path);
app.use(express.static(statis_path));
app.use(express.urlencoded({extended:true}));
console.log(process.env.SECRET_KEY);
app.get("",(req,res)=>{
    res.render("index");
});
app.get("/home",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/price",(req,res)=>{
    res.render("price");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.get("/category",(req,res)=>{
    res.render("category");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/register",async(req,res)=>{
    try{
        const oneuser = new User({
            lastName:req.body.lastName,
            userName:req.body.userName,
            state:req.body.state,
            code:req.body.code,
            firstName:req.body.firstName,
            city:req.body.city
        })
        const token = await oneuser.generateToken();
        // console.log(token);
        const result = await oneuser.save();
        console.log(result);
        res.render("login");
    }
    catch(e){
        console.log(e);
    }
})
app.post("/login",async(req,res)=>{
    try{
        const city = req.body.city;
        const userName = req.body.userName;
        const result  = await User.findOne({city:city})
        const token =await  result.generateToken();
        console.log(token);
        const isMatch = await bcrypt.compare(userName,result.userName)
        if(isMatch){
            res.render("index");
        }
        else{
            res.send("enter right userName")
        }
    }
    catch(e){
        console.log(e);
        res.send("enter valid creadential");
    }

})

//! practicing jsonwebtoken(jwt)
// const creatToken = async()=>{
//     const token = jwt.sign({_id:"63ba7ea3f43ad3da636241ad"},"iamayushsinghaliwanttofullstackwebdeveloper",{
//         expiresIn:"2 sec"
//     });
//     console.log(token);
//     const userVar = jwt.verify(token,"iamayushsinghaliwanttofullstackwebdeveloper");
//     console.log(userVar);
// }

// creatToken();

app.listen(port,"127.0.0.1",()=>{
    console.log(" listen successful ");
});