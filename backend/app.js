const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

main()
     .then(()=>{
        console.log("Connection Successful");
     })
     .catch( (err) => console.log(err) );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/reWaer")
} 

app.set("views", path.join(__dirname, "views")); //if we start server from other dir it will redirect it in views
app.set("View engine", "ejs");


app.get("/", (req, res)=>{
    res.send("Request recieved at root");
})

app.listen(8080, ()=>{
    console.log("App is listing for req & res");
})


    