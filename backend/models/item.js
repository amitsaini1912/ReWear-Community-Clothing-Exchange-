const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ["Jacket", "Shirt", "Pant", "T-Shirt", "Lower"]
  },
  fabricType: String,
  size: {
    type: String,
    required: true,
    enum: ["S", "M", "L", "XL", "XXL"]
  },
  condition:  {
    type: String,
    required: true,
    enum: ["Fair", "Good", "Like New"]
  },
  tags: [String],
  isAvailable: Boolean,
  availabilityOptions:{
    type: [String],
    required: true,
    enum: ["Swap Request", "Redeem via Points"]
  },
  image: String, // Use Multer to upload images

  /*uploader: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  },*/
  
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);
