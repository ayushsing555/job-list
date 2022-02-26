const express=require("express");
const app=express();
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
app.get("/home",(req,res)=>{
    res.render("index");
});
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
app.listen(port,"127.0.0.1",()=>{
    console.log(" listen successful ");
});