const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Item = require("./models/item");
const User = require("./models/user");

main()
     .then(()=>{
        console.log("Connection Successful");
     })
     .catch( (err) => console.log(err) );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/reWear")
} 

const cors = require('cors'); //CORS Error - to allow frontend to send data to backend api
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));



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

    res.json({ message: "Request received" })
})

app.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("uploader", "name");
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Item not found" });
  }
});

app.delete("/item/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(reqId);

    if (!deletedItem) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send({ message: "Item deleted successfully", id: deletedItem._id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting item" });
  }
});

//user routes
app.post("/signup", async(req, res) => {
    let newUser = new User(req.body);

     await newUser.save()
          .then( (res) => {console.log("newUser Saved")})
          .catch((err) => {console.log("Error")});

    res.send(newUser);
})

app.post("/login", async(req, res)=>{
    let user = await User.findOne(req.body).select("-password");
    if(user)
        res.send(user);
    else
        res.send("User not Found");
})

app.listen(8080, ()=>{
    console.log("App is listing for req & res");
})


    