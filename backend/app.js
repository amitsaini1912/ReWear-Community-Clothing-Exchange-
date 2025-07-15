const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Item = require("./models/item");

main()
     .then(()=>{
        console.log("Connection Successful");
     })
     .catch( (err) => console.log(err) );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/reWear")
} 

app.set("views", path.join(__dirname, "views")); //if we start server from other dir it will redirect it in views
app.set("View engine", "ejs");

app.use(express.static(path.join(__dirname, "Public"))) //Middleware To serve style files
app.use(express.urlencoded({extended: true})); //Middleware To parse post request 
app.use(express.json()); //Middleware To parse json data

app.get("/", (req, res)=>{
    res.send("Request recieved at root");
})

app.get("/browse", async (req, res)=>{
    const allItems = await Item.find({});
    res.send(allItems);
})

app.post("/add-item", async (req, res)=>{
    const newItem = new Item(req.body);
    await newItem.save()
          .then( (res) => {console.log("newItem Saved")})
          .catch((err) => {console.log("Error")});

    res.redirect("/");
})

app.get("/item/:id", async (req, res) => {
    let reqId = req.params.id;
    let item = await Item.findById(reqId);
    res.send(item);
})


app.listen(8080, ()=>{
    console.log("App is listing for req & res");
})


    