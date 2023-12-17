
const mongoose = require('mongoose')

const venueschema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please provide Venue Name"],
        unique:[true,"Venue already registered"]
    },
    mail:{
        type:String,
        required:[true,"Please provide mail"]
    },
    location:{
        type:String,
        required: [true,"Please provide venue location"],
    },
    capacity:{
        type:String,
        required: [true,"Please provide venue capacity"],
    },
    price:{
        type:String,
        required: [true,"Please provide price per person for capacity"],
    },
    longitude:{
        type:String,
        required: [true,"Please provide longitude of the venue"],
    },
    latitude:{
        type:String,
        required: [true,"Please provide latitude of the venue"],
    },
    image:{
        type:String,
        required:[true,"Please upload Venue image"]
    },
    description:{
        type:String,
        required:[true,"Please provide description for the venue"]
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'user',
                required:true
            },
            username:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    numOfReview:{
        type:Number,
        default:0
    }
    ,ratings:{
        type:Number,
        default:0
    }
})

const venue = mongoose.model('venue',venueschema)
module.exports = venue