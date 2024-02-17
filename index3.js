const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs")
const http=require("http");
const {MongoClient}=require("mongodb")
const session = require('express-session');


const templatepath=path.join(__dirname,"../templates");
app.set("view engine","hbs");
app.set("views",templatepath);

app.use(session({
    secret:"my secret key",
    resave:false,
    saveUninitialized:true
}));

const requirelogin=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.redirect("/")
    }
}

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/home",(req,res)=>{
    res.end("home")
})

app.listen(3000)