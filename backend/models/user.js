const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
            // Regular expression for validating email
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    points: {
         type: Number, 
         default: 100 
    },
})

module.exports = mongoose.model('User', userSchema);