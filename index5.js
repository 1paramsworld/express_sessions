const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const session = require('express-session');

const templatepath = path.join(__dirname, "../templates");
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

const authentication=(req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.redirect("/login")
    }
}

app.get("/login",(req,res)=>{
    const a=2;
    if(a==1){
        req.session.user=a;
        res.redirect("/home")
    }
    else{
        res.end("a value is not correct")
    }
})

app.get("/home",authentication,(req,res)=>{
    res.end("<h1>welcome to home page</h1>")
})
app.get("/home/hey",authentication,(req,res)=>{
    res.end("<h1>welcome to hey page</h1>")
})


app.listen(3000)