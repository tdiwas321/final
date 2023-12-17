const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: [true,"Please provide your firstname"]
    },
    lastname:{
        type:String,
        required: [true,"Please provide your last name"]
    },
    address:{
        type:String,
        required: [true,"Please provide your address"]
    },
    phone:{
        type:String,
        required: [true,"Please provide your phone number"],
    },
    username:{
        type:String,
        required: [true,"Please provide an username"],
        unique:[true,"Username already in registered"]
    },
    email:{
        type:String,
        required: [true,"Please provide your email"],
        // unique:[true,"Email already in registered"]
    },
    password:{
        type:String,
        required: [true,"Please provide your password"]
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
      },
})

const user = mongoose.model('user',userSchema)
module.exports = user