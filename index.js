const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs")
const http=require("http");
const {MongoClient}=require("mongodb")

const templatepath=path.join(__dirname,"../templates");
app.set("view engine","hbs");
app.set("views",templatepath);

app.get("/",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client=new MongoClient(url);

    client.connect().then(()=>{
        const db=client.db("paramshah");
        const collection=db.collection("paramdata");
        return collection.find({email:"rudra@123"}).toArray()
    }).then((data)=>{
        res.render("index2",{document:data})
    })
});

app.listen(3000,()=>{
    console.log("listening to port no 3000")
})

